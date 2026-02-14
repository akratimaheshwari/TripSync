import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Bell, Globe, DollarSign, Lock } from 'lucide-react';

export const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    tripUpdates: true,
    budgetAlerts: false,
  });

  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');
  const [travelStyle, setTravelStyle] = useState('balanced');

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
              </div>
            </div>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-sm text-gray-600">Receive updates for {key}</p>
                  </div>
                  <button
                    onClick={() => toggleNotification(key)}
                    className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Regional Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300">
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};