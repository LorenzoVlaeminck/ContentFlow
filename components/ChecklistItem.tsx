import React from 'react';
import { Check, Sparkles, ChevronDown, ChevronUp, Lightbulb, FileText, Image as ImageIcon } from 'lucide-react';
import { ChecklistItem as ChecklistItemType, AIActionType } from '../types';

interface Props {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
  onAITrigger: (action: AIActionType, itemTitle: string) => void;
}

const ChecklistItem: React.FC<Props> = ({ item, onToggle, onAITrigger }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isSavedImage = item.savedContent?.startsWith('data:image');

  return (
    <div 
      className={`group border rounded-2xl mb-4 transition-all duration-300 ease-out relative overflow-hidden ${
        item.isCompleted 
          ? 'bg-slate-50/80 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-90' 
          : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 dark:hover:shadow-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-700 hover:-translate-y-0.5'
      }`}
    >
        {/* Active Indicator Strip */}
        {!item.isCompleted && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
        )}

      <div className="flex items-start sm:items-center p-5 gap-4">
        <button
          onClick={() => onToggle(item.id)}
          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 mt-0.5 sm:mt-0 flex items-center justify-center transition-all duration-300 ${
            item.isCompleted 
              ? 'bg-green-500 border-green-500 text-white scale-100' 
              : 'border-slate-300 dark:border-slate-600 text-transparent hover:border-indigo-400 dark:hover:border-indigo-400 hover:scale-105'
          }`}
        >
          <Check size={16} strokeWidth={4} className={`transition-transform duration-300 ${item.isCompleted ? 'scale-100' : 'scale-0'}`} />
        </button>

        <div className="flex-grow cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <h3 className={`font-semibold text-lg transition-colors duration-300 ${item.isCompleted ? 'text-slate-400 dark:text-slate-600 line-through decoration-slate-300 dark:decoration-slate-700' : 'text-slate-800 dark:text-slate-100 group-hover:text-indigo-900 dark:group-hover:text-indigo-300'}`}>
                {item.text}
            </h3>
            {item.savedContent && (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border w-fit ${
                    isSavedImage 
                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800' 
                    : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800'
                }`}>
                    {isSavedImage ? <ImageIcon size={10} className="mr-1.5" /> : <FileText size={10} className="mr-1.5" />}
                    {isSavedImage ? 'Asset Ready' : 'Notes Saved'}
                </span>
            )}
          </div>
          {!isExpanded && (
              <p className={`text-sm mt-1 truncate max-w-md ${item.isCompleted ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                  {item.description}
              </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
            {item.aiAction && !item.isCompleted && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onAITrigger(item.aiAction!, item.text);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-bold rounded-full hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all shadow-md hover:shadow-lg hover:shadow-indigo-500/30 whitespace-nowrap z-10"
            >
                <Sparkles size={12} className="text-indigo-300 dark:text-indigo-600" />
                AI Assist
            </button>
            )}

            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 transition-colors"
            >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
        </div>
      </div>

      {/* Expanded Content */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-6 ml-0 sm:ml-11 border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4">
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.description}</p>
          
          {item.expertTip && (
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-4 rounded-xl border border-amber-100/60 dark:border-amber-900/30 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
              <div className="flex gap-3 items-start relative z-10">
                <div className="mt-0.5 bg-white dark:bg-amber-900/40 p-1.5 rounded-full text-amber-500 shadow-sm border border-amber-100 dark:border-amber-800">
                    <Lightbulb size={16} fill="currentColor" className="opacity-100" />
                </div>
                <div>
                    <span className="font-bold text-amber-900/80 dark:text-amber-200/80 text-xs uppercase tracking-wider block mb-1">Expert Insight</span>
                    <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium">{item.expertTip}</p>
                </div>
              </div>
            </div>
          )}

          {item.savedContent && (
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-inner">
              <span className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                {isSavedImage ? <ImageIcon size={14} /> : <FileText size={14} />}
                {isSavedImage ? 'Generated Asset' : 'Saved Notes'}
              </span>
              
              {isSavedImage ? (
                  <div className="bg-white dark:bg-black p-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex justify-center group/image cursor-pointer">
                    <img 
                        src={item.savedContent} 
                        alt="Saved asset" 
                        className="max-h-64 rounded-md object-contain transition-transform duration-300 group-hover/image:scale-[1.02]"
                    />
                  </div>
              ) : (
                <div className="bg-white dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap font-mono max-h-48 overflow-y-auto leading-relaxed">
                    {item.savedContent}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistItem;