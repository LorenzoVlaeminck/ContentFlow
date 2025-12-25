import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Save, Download, Image as ImageIcon, Wand2 } from 'lucide-react';
import { AIActionType } from '../types';
import { generateAIResponse, generateImage } from '../services/geminiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  action: AIActionType | null;
  contextTitle: string;
  onSave: (content: string) => void;
}

const IMAGE_EXAMPLES = [
  "Minimalist 3D isometric chart showing upward trend, clay render style, soft pastel background, high resolution.",
  "Photorealistic flat lay of a creative workspace: open laptop, black coffee, notebook, natural sunlight, 4k.",
  "Futuristic abstract background with glowing connected data nodes, dark blue and violet gradient, cybernetic aesthetic.",
  "Vibrant YouTube thumbnail background, high contrast yellow and black, bold geometric shapes, expressive style.",
  "Whimsical cartoon illustration of a content creator at a desk, lo-fi hip hop aesthetic, warm cozy lighting, detailed vector art.",
  "Vintage 1950s travel poster style for 'Remote Work', textured paper effect, retro typography, teal and orange color palette.",
  "Abstract fluid art representing digital connectivity, swirling liquid colors, gold foil accents, marble texture, high elegance."
];

const AIAssistant: React.FC<Props> = ({ isOpen, onClose, action, contextTitle, onSave }) => {
  const [inputContext, setInputContext] = useState('');
  const [response, setResponse] = useState('');
  const [imageResponse, setImageResponse] = useState(''); // Store base64 image data
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const isImageMode = action === AIActionType.GENERATE_IMAGE;

  React.useEffect(() => {
    if (isOpen) {
      setResponse('');
      setImageResponse('');
      setInputContext('');
      setIsCopied(false);
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen || !action) return null;

  const handleGenerate = async () => {
    if (!inputContext.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    setImageResponse('');
    setIsSaved(false);
    
    try {
        if (isImageMode) {
            const imgData = await generateImage(inputContext);
            setImageResponse(imgData);
        } else {
            const result = await generateAIResponse(action, inputContext);
            setResponse(result);
        }
    } catch (e) {
        setResponse("Error generating content. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    // Save either text or image data
    onSave(isImageMode ? imageResponse : response);
    setIsSaved(true);
    setTimeout(() => {
        onClose();
    }, 1000);
  }

  const handleDownloadImage = () => {
      if (!imageResponse) return;
      const a = document.createElement('a');
      a.href = imageResponse;
      a.download = `contentflow-image-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  };

  const getModalTitle = () => {
    switch (action) {
      case AIActionType.GENERATE_IDEAS: return 'Content Idea Generator';
      case AIActionType.GENERATE_HOOKS: return 'Viral Hook Writer';
      case AIActionType.POLISH_CONTENT: return 'Content Polisher';
      case AIActionType.SEO_KEYWORDS: return 'SEO Keyword Finder';
      case AIActionType.REPURPOSE_CONTENT: return 'Content Repurposer';
      case AIActionType.GENERATE_IMAGE: return 'AI Image Generator';
      default: return 'AI Assistant';
    }
  };

  const getPlaceholder = () => {
    switch (action) {
      case AIActionType.GENERATE_IDEAS: return 'Enter your general niche or topic (e.g., "SaaS Marketing")';
      case AIActionType.GENERATE_HOOKS: return 'Enter your specific topic (e.g., "Why cold calling is dead")';
      case AIActionType.POLISH_CONTENT: return 'Paste your rough paragraph here...';
      case AIActionType.SEO_KEYWORDS: return 'Enter your main topic (e.g., "Vegan recipes")';
      case AIActionType.REPURPOSE_CONTENT: return 'Paste your main content text or idea here...';
      case AIActionType.GENERATE_IMAGE: return 'Describe the image in detail. Mention style, lighting, colors, and specific objects (e.g., "A cinematic shot of...")';
      default: return 'Enter context...';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] border border-white/20 ring-1 ring-black/5 dark:ring-white/10 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                {isImageMode ? <ImageIcon size={20} /> : <Sparkles size={20} />}
            </div>
            <div>
                <h3 className="font-bold text-lg leading-tight">{getModalTitle()}</h3>
                <p className="text-indigo-100 text-xs font-medium">Powered by Gemini</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all relative z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-grow overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50">
          <div className="mb-5 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-3 rounded-xl">
             <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-1">Context</p>
             <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{contextTitle}</p>
          </div>

          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 pl-1">
            Your Prompt
          </label>
          <div className="relative">
            <textarea
                className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 focus:border-indigo-500 outline-none transition-all text-slate-700 dark:text-slate-200 mb-4 bg-white dark:bg-slate-950 shadow-sm resize-none placeholder:text-slate-400"
                rows={3}
                placeholder={getPlaceholder()}
                value={inputContext}
                onChange={(e) => setInputContext(e.target.value)}
            />
          </div>

          {/* Image Prompt Examples */}
          {isImageMode && !imageResponse && (
            <div className="mb-6 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 size={14} className="text-indigo-500" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Try an example style</span>
              </div>
              <div className="grid gap-2">
                {IMAGE_EXAMPLES.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputContext(example)}
                    className="text-left text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-slate-600 p-3 rounded-lg transition-all shadow-sm hover:shadow group"
                  >
                    <span className="font-semibold text-slate-400 dark:text-slate-500 group-hover:text-indigo-400 mr-2">
                      0{idx + 1}.
                    </span> 
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading || !inputContext.trim()}
            className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
              isLoading || !inputContext.trim()
                ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Thinking...
              </>
            ) : (
              <>
                {isImageMode ? <ImageIcon size={18} /> : <Sparkles size={18} />}
                {isImageMode ? 'Generate Image' : 'Generate Response'}
              </>
            )}
          </button>

          {/* Result Area */}
          {(response || imageResponse) && (
            <div className="mt-8 animate-fade-in-up">
              <div className="flex justify-between items-center mb-3 px-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    AI Output
                </label>
                <div className="flex gap-2">
                    {/* Copy Button only for text */}
                    {!isImageMode && (
                        <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 px-3 py-1.5 rounded-lg transition-all shadow-sm"
                        >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        {isCopied ? 'Copied' : 'Copy'}
                        </button>
                    )}

                    {/* Download Button only for image */}
                    {isImageMode && imageResponse && (
                        <button 
                        onClick={handleDownloadImage}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 px-3 py-1.5 rounded-lg transition-all shadow-sm"
                        >
                            <Download size={14} /> Download
                        </button>
                    )}
                    
                    <button 
                    onClick={handleSave}
                    disabled={isSaved}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-sm border ${
                        isSaved 
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' 
                        : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                    }`}
                    >
                    {isSaved ? <Check size={14} /> : <Save size={14} />}
                    {isSaved ? 'Saved' : 'Save to Checklist'}
                    </button>
                </div>
              </div>

              {/* Display Logic */}
              <div className="p-5 bg-white dark:bg-slate-950 rounded-xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed relative overflow-hidden group">
                 {!isImageMode && <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>}
                
                {isImageMode ? (
                    <div className="flex justify-center bg-slate-50 dark:bg-slate-900 rounded-lg p-2 border border-slate-100 dark:border-slate-800">
                        <img 
                            src={imageResponse} 
                            alt="Generated content" 
                            className="rounded-lg shadow-sm max-h-64 object-contain"
                        />
                    </div>
                ) : (
                    response
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;