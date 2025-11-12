import React, { useEffect, useState } from 'react';
import { XIcon } from './IconComponents';
import type { GostDocument } from '../types';


export const InfoModal: React.FC<{ title: string; content: string; onClose: () => void }> = ({ title, content, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                     <h3 id="info-modal-title" className="text-xl font-bold text-blue-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700" aria-label="Закрыть">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
                </div>
            </div>
        </div>
    );
};
