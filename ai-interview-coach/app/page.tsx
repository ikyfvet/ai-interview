'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: '欢迎来到AI中文面试教练，请开始自我介绍。' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const updated = [...messages, { role: 'user', text: input }];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated })
      });
      const data = await res.json();
      setMessages([...updated, { role: 'ai', text: data.reply }]);
    } catch {
      setMessages([...updated, { role: 'ai', text: '出错了，请稍后重试' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">AI 中文面试教练</h1>
      <div className="bg-gray-50 p-4 rounded h-96 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm ${msg.role === 'ai' ? 'text-left' : 'text-right'}`}>
            <span className="inline-block px-3 py-2 bg-white rounded shadow">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder="请输入回答..." disabled={loading} />
        <Button onClick={handleSend} disabled={loading}>发送</Button>
      </div>
    </main>
  );
}