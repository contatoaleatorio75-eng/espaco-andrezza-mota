
"use client";

import { useState, useEffect } from 'react';
import { SITE_SETTINGS as DEFAULT_SETTINGS } from '@/data/site-settings';

export default function AdminDashboard() {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [showCopyMsg, setShowCopyMsg] = useState(false);

    // Sync with CSS variables for live preview
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', settings.colors.primary);
        root.style.setProperty('--secondary-color', settings.colors.secondary);
        root.style.setProperty('--bg-color', settings.colors.background);
        root.style.setProperty('--text-color', settings.colors.text);
        root.style.setProperty('--accent-color', settings.colors.accent);
        root.style.setProperty('--watermark-opacity', settings.watermark.enabled ? settings.watermark.opacity.toString() : '0');
        root.style.setProperty('--watermark-size', `${settings.watermark.size}px`);
    }, [settings]);

    const handleColorChange = (key: keyof typeof settings.colors, val: string) => {
        setSettings(prev => ({
            ...prev,
            colors: { ...prev.colors, [key]: val }
        }));
    };

    const copyConfig = () => {
        const configStr = `Pode aplicar estas novas configurações no site:\n\n${JSON.stringify(settings, null, 2)}`;
        navigator.clipboard.writeText(configStr);
        setShowCopyMsg(true);
        setTimeout(() => setShowCopyMsg(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Sidebar Controls */}
                <div className="w-full md:w-80 bg-gray-900 text-white p-8">
                    <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <span className="text-am-green">⚙️</span> Painel Espaço AM
                    </h1>

                    <div className="space-y-8">
                        {/* Colors */}
                        <div>
                            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-bold">Cores do Tema</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm">Cor Principal</label>
                                    <input
                                        type="color"
                                        value={settings.colors.primary}
                                        onChange={(e) => handleColorChange('primary', e.target.value)}
                                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm">Cor Secundária</label>
                                    <input
                                        type="color"
                                        value={settings.colors.secondary}
                                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm">Cor do Texto</label>
                                    <input
                                        type="color"
                                        value={settings.colors.text}
                                        onChange={(e) => handleColorChange('text', e.target.value)}
                                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Layout */}
                        <div>
                            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-bold">Logo & Marca d'água</h2>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm flex justify-between">
                                        Tamanho da Logo <span>{settings.logoSize}px</span>
                                    </label>
                                    <input
                                        type="range" min="40" max="150"
                                        value={settings.logoSize}
                                        onChange={(e) => setSettings(p => ({ ...p, logoSize: parseInt(e.target.value) }))}
                                        className="w-full accent-am-green"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-sm">Ativar Marca d'água</label>
                                    <input
                                        type="checkbox"
                                        checked={settings.watermark.enabled}
                                        onChange={(e) => setSettings(p => ({ ...p, watermark: { ...p.watermark, enabled: e.target.checked } }))}
                                        className="w-5 h-5 accent-am-green"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm flex justify-between">
                                        Opacidade <span>{Math.round(settings.watermark.opacity * 100)}%</span>
                                    </label>
                                    <input
                                        type="range" min="0" max="0.3" step="0.01"
                                        value={settings.watermark.opacity}
                                        onChange={(e) => setSettings(p => ({ ...p, watermark: { ...p.watermark, opacity: parseFloat(e.target.value) } }))}
                                        className="w-full accent-am-green"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button
                            onClick={copyConfig}
                            className="w-full bg-am-green hover:bg-opacity-80 text-gray-900 font-bold py-3 rounded-xl transition-all shadow-lg shadow-am-green/20"
                        >
                            Copiar Configurações
                        </button>
                        {showCopyMsg && (
                            <p className="text-xs text-center mt-2 text-am-green animate-bounce">✓ Código copiado!</p>
                        )}
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-hidden flex flex-col bg-white">
                    <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pré-visualização em tempo real</span>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto bg-white p-8 relative">
                        <div className="watermark-container absolute inset-0 opacity-[var(--watermark-opacity)]" />

                        {/* Mini Header Preview */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm mb-8 flex items-center gap-4">
                            <div
                                className="bg-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400"
                                style={{ width: settings.logoSize / 2, height: settings.logoSize / 2 }}
                            >
                                LOGO
                            </div>
                            <div>
                                <h3 className="font-serif font-black" style={{ color: settings.colors.text }}>{settings.brandName}</h3>
                                <div className="h-1 w-20 rounded-full" style={{ backgroundColor: settings.colors.primary }}></div>
                            </div>
                        </div>

                        {/* Content Samples */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif font-bold" style={{ color: settings.colors.text }}>Exemplo de Título</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Este é um exemplo de como as cores e fontes ficarão no seu site real.
                                Você pode testar cores mais vibrantes ou mais sóbrias e ver o resultado aqui mesmo.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-6 py-2 rounded-full font-bold text-white transition-opacity" style={{ backgroundColor: settings.colors.primary }}>Botão Primário</button>
                                <button className="px-6 py-2 rounded-full font-bold text-white transition-opacity" style={{ backgroundColor: settings.colors.secondary }}>Botão Secundário</button>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-blue-50 border-t border-blue-100">
                        <h4 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                            <span>ℹ️</span> Como aplicar?
                        </h4>
                        <p className="text-sm text-blue-800 leading-relaxed">
                            Depois de escolher as cores e tamanhos ideais, clique em <strong>"Copiar Configurações"</strong> e cole o código resultante aqui no chat para mim. Eu aplicarei tudo no site oficial instantaneamente para você!
                        </p>
                    </div>
                </div>

            </div>

            <p className="text-center mt-8 text-gray-500 text-sm">
                Painel de Configuração Rápida - Espaço Andrezza Mota © 2026
            </p>
        </div>
    );
}
