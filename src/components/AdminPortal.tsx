import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  FileText, 
  PlusCircle, 
  Trash2, 
  LogOut, 
  ExternalLink, 
  Phone, 
  Calendar, 
  Clock, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle,
  X,
  RefreshCw,
  Sparkles,
  UploadCloud
} from 'lucide-react';
import { BlogPost, ContactInquiry } from '../types';
import { COMPANY_INFO } from '../data/websiteData';
import { WhatsAppIcon } from './SocialIcons';

interface AdminPortalProps {
  onExit: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('mdt_admin_token');
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab: 'insights' | 'contacts'
  const [adminTab, setAdminTab] = useState<'insights' | 'contacts'>('insights');

  // Insights State
  const [insights, setInsights] = useState<BlogPost[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [isCreatingInsight, setIsCreatingInsight] = useState(false);
  const [insightForm, setInsightForm] = useState({
    title: '',
    category: 'AI & ML',
    author: 'Manideep Juvvala',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    imageDescription: '',
    imageUrl: '',
    excerpt: '',
    content: ''
  });
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  // Media Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG, etc.)');
      return;
    }

    setUploadedFileName(file.name);
    setIsCompressingImage(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // Auto-compress & scale to max 1200px width/height for fast loading
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setUploadedImagePreview(compressed);
          setInsightForm(prev => ({ ...prev, imageUrl: compressed }));
        } else {
          setUploadedImagePreview(rawDataUrl);
          setInsightForm(prev => ({ ...prev, imageUrl: rawDataUrl }));
        }
        setIsCompressingImage(false);
      };
      img.onerror = () => {
        setUploadedImagePreview(rawDataUrl);
        setInsightForm(prev => ({ ...prev, imageUrl: rawDataUrl }));
        setIsCompressingImage(false);
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveUploadedImage = () => {
    setUploadedImagePreview('');
    setUploadedFileName('');
    setInsightForm(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Contacts State
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);

  // Fetch Insights from MongoDB
  const fetchInsights = async () => {
    setIsLoadingInsights(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setInsights(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch insights:', err);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('mdt_admin_token') || '';
    return { 'Authorization': `Bearer ${token}` };
  };

  // Fetch Contacts from MongoDB
  const fetchContacts = async () => {
    setIsLoadingContacts(true);
    try {
      const res = await fetch('/api/contacts', {
        headers: getAuthHeader()
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setContacts(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setIsLoadingContacts(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInsights();
      fetchContacts();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('mdt_admin_token', data.token);
        localStorage.setItem('mdt_admin_user', JSON.stringify(data.user));
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Invalid credentials. Check email and password.');
      }
    } catch (err) {
      setLoginError('Server error while logging in. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('mdt_admin_token');
    localStorage.removeItem('mdt_admin_user');
    setIsAuthenticated(false);
  };

  // Handle Create Insight
  const handleCreateInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!insightForm.title || !insightForm.excerpt) {
      setFormStatus({ type: 'error', message: 'Title and Excerpt are required.' });
      return;
    }

    setFormStatus({ type: 'loading', message: 'Publishing insight to MongoDB...' });

    try {
      const paragraphs = insightForm.content
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({
          ...insightForm,
          content: paragraphs.length > 0 ? paragraphs : [insightForm.excerpt]
        })
      });

      const data = await res.json();
      if (data.success) {
        setFormStatus({ type: 'success', message: 'Insight published successfully!' });
        setInsightForm({
          title: '',
          category: 'AI & ML',
          author: 'Manideep Juvvala',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          imageDescription: '',
          imageUrl: '',
          excerpt: '',
          content: ''
        });
        setUploadedImagePreview('');
        setUploadedFileName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsCreatingInsight(false);
        fetchInsights();
      } else {
        setFormStatus({ type: 'error', message: data.error || 'Failed to publish insight.' });
      }
    } catch (err) {
      setFormStatus({ type: 'error', message: 'Network error publishing insight.' });
    }
  };

  // Handle Delete Insight
  const handleDeleteInsight = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this insight?')) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { 
        method: 'DELETE',
        headers: getAuthHeader()
      });
      const data = await res.json();
      if (data.success) {
        setInsights(prev => prev.filter(i => i.id !== id));
      } else {
        alert(data.error || 'Failed to delete insight.');
      }
    } catch (err) {
      alert('Failed to delete insight.');
    }
  };

  // Handle Delete Contact
  const handleDeleteContact = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contact lead?')) return;
    try {
      const res = await fetch(`/api/contacts?id=${id}`, { 
        method: 'DELETE',
        headers: getAuthHeader()
      });
      const data = await res.json();
      if (data.success) {
        setContacts(prev => prev.filter(c => c.id !== id));
      } else {
        alert(data.error || 'Failed to delete contact.');
      }
    } catch (err) {
      alert('Failed to delete contact.');
    }
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen bg-mesh-grid flex items-center justify-center p-4 sm:p-6 admin-portal-root"
        data-admin-portal="true"
      >
        <div className="bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 border-2 border-slate-200 shadow-2xl space-y-8 relative">
          
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <Lock className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ADMIN PORTAL
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {COMPANY_INFO.name} • Internal Engineering & Lead Management
            </p>
          </div>

          {loginError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="manideeptechsolutions@gmai.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-orange w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>SIGN IN TO ADMIN</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={onExit}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Return to Public Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // LOGGED-IN ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div 
      className="min-h-screen bg-mesh-grid text-slate-900 pb-20 pt-10 admin-portal-root"
      data-admin-portal="true"
    >
      
      {/* Top Admin Navigation Bar */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <img
              src="/Logo.jpeg"
              alt="Mani DeepTech Solutions Logo"
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900">
                  {COMPANY_INFO.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase">
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                MongoDB Connected: <code className="font-mono text-emerald-600 font-bold">manideep_deeptech</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Tabs Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAdminTab('insights')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black tracking-wide transition-all cursor-pointer ${
                adminTab === 'insights'
                  ? 'btn-blue shadow-md'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Insights Management ({insights.length})</span>
              </span>
            </button>

            <button
              onClick={() => setAdminTab('contacts')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black tracking-wide transition-all cursor-pointer ${
                adminTab === 'contacts'
                  ? 'btn-green shadow-md'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Contact Inquiries & Leads ({contacts.length})</span>
              </span>
            </button>
          </div>

          {adminTab === 'insights' && (
            <button
              onClick={() => setIsCreatingInsight(true)}
              className="btn-orange inline-flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>CREATE NEW INSIGHT</span>
            </button>
          )}

          {adminTab === 'contacts' && (
            <button
              onClick={fetchContacts}
              className="btn-white-outline inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span>Refresh Leads</span>
            </button>
          )}
        </div>

        {/* ==================================================== */}
        {/* TAB 1: INSIGHTS MANAGEMENT */}
        {/* ==================================================== */}
        {adminTab === 'insights' && (
          <div className="space-y-6">
            
            {isLoadingInsights ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                <div className="text-sm font-bold text-slate-600">Loading insights from MongoDB...</div>
              </div>
            ) : insights.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200 p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">No Insights Published Yet</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  All sample posts have been removed as requested. You or your staff can publish authentic engineering updates, project architectures, or milestones directly below.
                </p>
                <button
                  onClick={() => setIsCreatingInsight(true)}
                  className="btn-orange inline-flex items-center gap-2 px-7 py-3 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish First Insight</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {item.excerpt}
                      </p>

                      {item.imageDescription && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                          <ImageIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-700">Image Description: </span>
                            <span>{item.imageDescription}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-600">
                        Author: <strong className="text-slate-900">{item.author}</strong>
                      </span>

                      <button
                        onClick={() => handleDeleteInsight(item.id)}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: CONTACT INQUIRIES & LEADS */}
        {/* ==================================================== */}
        {adminTab === 'contacts' && (
          <div className="space-y-6">
            
            {isLoadingContacts ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
                <div className="text-sm font-bold text-slate-600">Loading contacts from MongoDB...</div>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200 p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">No Contact Submissions Yet</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  When potential clients or students submit inquiries on the Contact page, their details and exact timestamp will automatically be stored here and notified to your WhatsApp!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg sm:text-xl font-black text-slate-900">
                            {contact.name}
                          </h3>
                          <span className="text-[11px] font-black px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                            {contact.service}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Submitted: {contact.timestamp}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={`https://wa.me/91${contact.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(contact.name)}%2C%20this%20is%20Manideep%20from%20Mani%20DeepTech%20Solutions.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-green inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                          <span>Chat on WhatsApp</span>
                        </a>

                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-2.5 rounded-xl text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-medium">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 font-bold block mb-0.5">Phone Number:</span>
                        <a href={`tel:${contact.phone}`} className="font-mono font-black text-slate-900 text-sm hover:text-blue-600">
                          {contact.phone}
                        </a>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 font-bold block mb-0.5">Email Address:</span>
                        <a href={`mailto:${contact.email}`} className="font-black text-slate-900 hover:text-blue-600">
                          {contact.email || 'Not Provided'}
                        </a>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 sm:col-span-2 md:col-span-1">
                        <span className="text-slate-400 font-bold block mb-0.5">Service Requested:</span>
                        <span className="font-black text-slate-900">{contact.service}</span>
                      </div>
                    </div>

                    {contact.message && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                        <strong className="text-slate-900 block mb-1">Inquiry / Project Details:</strong>
                        {contact.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </main>

      {/* ==================================================== */}
      {/* MODAL: CREATE NEW INSIGHT */}
      {/* ==================================================== */}
      {isCreatingInsight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-slate-200 p-6 sm:p-10 space-y-6 relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Publish New Company Insight
                </h2>
              </div>
              <button
                onClick={() => setIsCreatingInsight(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formStatus.message && (
              <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                formStatus.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                formStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {formStatus.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />}
                {formStatus.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                <span>{formStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleCreateInsight} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Insight / Blog Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deployment of Multi-Agent Orchestrator for Real-Time Financial Telemetry"
                  value={insightForm.title}
                  onChange={(e) => setInsightForm({ ...insightForm, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Category
                  </label>
                  <select
                    value={insightForm.category}
                    onChange={(e) => setInsightForm({ ...insightForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-bold focus:bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="AI & ML">AI & ML</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Final Year Projects">Final Year Projects</option>
                    <option value="Company Updates">Company Updates</option>
                    <option value="Staff Engineering">Staff Engineering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Author / Completed By
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Manideep Juvvala / Staff Engineer"
                    value={insightForm.author}
                    onChange={(e) => setInsightForm({ ...insightForm, author: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Date
                </label>
                <input
                  type="text"
                  required
                  placeholder="25 Sep 2026"
                  value={insightForm.date}
                  onChange={(e) => setInsightForm({ ...insightForm, date: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* MEDIA UPLOAD SECTION */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-600" />
                    <span>Media Upload / Diagram (Optional)</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Upload from device or enter URL
                  </span>
                </div>

                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleImageFileSelect} 
                  className="hidden" 
                />

                {/* If image is already attached: Preview Card */}
                {(uploadedImagePreview || insightForm.imageUrl) ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-white p-3 space-y-3">
                    <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
                      <img 
                        src={uploadedImagePreview || insightForm.imageUrl} 
                        alt="Media Preview" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveUploadedImage}
                        className="absolute top-2 right-2 p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-lg cursor-pointer transition-transform hover:scale-105"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 truncate max-w-xs">
                        {uploadedFileName || 'Media attached'}
                      </span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Change File</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Upload Button and URL Fallback */
                  <div className="space-y-3">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-white cursor-pointer transition-all hover:bg-blue-50/50 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2 transition-colors">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-black text-slate-800 uppercase tracking-wider group-hover:text-blue-600">
                        {isCompressingImage ? 'Optimizing Image...' : 'Click to Upload Media / Screenshot from Device'}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 font-medium">
                        Supports PNG, JPG, WebP, GIF, SVG (Auto-compressed for ultra-fast loading)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-px bg-slate-200 flex-1"></div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">or paste image link</span>
                      <div className="h-px bg-slate-200 flex-1"></div>
                    </div>

                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... (optional external link)"
                      value={insightForm.imageUrl}
                      onChange={(e) => {
                        setInsightForm({ ...insightForm, imageUrl: e.target.value });
                        setUploadedImagePreview(e.target.value);
                      }}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Image Description / Architecture Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Architecture diagram of multi-agent LangGraph workflow running with FastAPI and Docker"
                  value={insightForm.imageDescription}
                  onChange={(e) => setInsightForm({ ...insightForm, imageDescription: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Short Excerpt / Summary *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="A concise 1-2 sentence overview of the technical work or accomplishment."
                  value={insightForm.excerpt}
                  onChange={(e) => setInsightForm({ ...insightForm, excerpt: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Detailed Content (Separate paragraphs by new line)
                </label>
                <textarea
                  rows={5}
                  placeholder="Write full technical explanation, implementation details, tools used, results achieved..."
                  value={insightForm.content}
                  onChange={(e) => setInsightForm({ ...insightForm, content: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingInsight(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className="btn-orange px-7 py-2.5 text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {formStatus.type === 'loading' ? 'PUBLISHING...' : 'PUBLISH TO WEBSITE'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
