import React from 'react';
import { Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription.js';
import { getUserContext } from '../lib/authHelpers.js';

export default function TimetablePage() {
  const { subscribe, feedUrl, loading, error } = useSubscription();
  const user = getUserContext();

  const handleSubscribe = () => {
    const studentRegNumber = user?.student_number || '23/U/16751/PS';
    subscribe(studentRegNumber);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Top Status Bar */}
      <div className="bg-white border border-gray-200 rounded-sm p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-[#1A935A]">PROGRAMME:</span>
          <span className="text-gray-700">BACHELOR OF INFORMATION SYSTEMS AND TECHNOLOGY - (BIST)</span>
          <span className="bg-[#1A935A] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm ml-2">ACTIVE</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        
        <div className="flex items-center justify-between border-b border-gray-200 px-4 pt-3">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-[#1A935A] border-b-2 border-[#1A935A] pb-2 font-semibold text-sm">
              <CalendarIcon size={16} /> ADD TO CALENDAR
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="border border-[#BBDEFB] rounded-sm overflow-hidden shadow-sm">
            <div className="bg-[#E3F2FD] text-[#0D47A1] px-4 py-2 font-bold text-[12px] flex items-center justify-between border-b border-[#BBDEFB]">
              <div className="flex items-center gap-2">
                <CalendarIcon size={14} /> GENERATE LINK 
              </div>
            </div>
            
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-700 mb-4 font-medium max-w-3xl leading-relaxed">
                Generate a link to automatically sync your Makerere University timetable with your personal calendar.
              </p>
              
              <div>
                <button 
                  onClick={handleSubscribe} 
                  disabled={loading}
                  className="bg-[#1A935A] hover:bg-[#147a4a] text-white px-5 py-3 rounded-sm font-bold text-[11px] transition-colors shadow-sm whitespace-nowrap flex items-center justify-center gap-2"
                >
                  {loading ? 'GENERATING...' : 'GENERATE CALENDAR FEED URL'}
                </button>
              </div>

              {error && (
               <div className="mt-3 p-2 bg-red-50 text-red-700 border border-red-200 rounded-sm text-xs font-semibold">
                  Error: {error}
                </div>
              )}

              {feedUrl && (
                <div className="mt-5 border border-[#C8E6C9] rounded-sm p-4 bg-[#F1F8E9] shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#C8E6C9] rounded-bl-full -mr-8 -mt-8"></div>
                  <CheckCircle size={16} className="absolute top-3 right-3 text-[#2E7D32]" />
                  
                  <p className="text-[#2E7D32] text-xs font-bold mb-2">FEED URL GENERATED SUCCESSFULLY</p>
                  <input 
                    readOnly 
                    value={feedUrl} 
                    className="w-full bg-white border border-[#A5D6A7] rounded-sm px-3 py-2 text-[11px] font-mono outline-none text-gray-800 mb-3 block shadow-inner" 
                    onClick={(e) => e.target.select()}
                  />
                  <div className="flex items-center gap-3">
                     <button 
                       onClick={() => navigator.clipboard.writeText(feedUrl)}
                       className="bg-[#1A935A] border border-[#1A935A] text-white text-[11px] font-bold px-4 py-1.5 rounded-sm shadow-sm hover:bg-[#147a4a] transition-colors"
                     >
                        COPY URL
                     </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
