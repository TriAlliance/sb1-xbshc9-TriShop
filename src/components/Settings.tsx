import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

type SettingsFormData = {
  woocommerceUrl: string;
  consumerKey: string;
  consumerSecret: string;
};

const Settings: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<SettingsFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setError(null);
        const response = await axios.get('/api/settings');
        const { woocommerceUrl, consumerKey, consumerSecret } = response.data;
        setValue('woocommerceUrl', woocommerceUrl || '');
        setValue('consumerKey', consumerKey || '');
        setValue('consumerSecret', consumerSecret || '');
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : 'An unknown error occurred';
        setError(`Failed to load settings: ${errorMessage}`);
        toast.error(`Failed to load settings: ${errorMessage}`);
      }
    };

    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: SettingsFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post('/api/settings', data);
      toast.success('Settings saved successfully');
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : 'An unknown error occurred';
      setError(`Failed to save settings: ${errorMessage}`);
      toast.error(`Failed to save settings: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">WooCommerce API Settings</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="woocommerceUrl" className="block text-sm font-medium text-gray-700">
            WooCommerce URL
          </label>
          <input
            type="url"
            id="woocommerceUrl"
            {...register('woocommerceUrl', { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://your-store.com"
          />
        </div>
        <div>
          <label htmlFor="consumerKey" className="block text-sm font-medium text-gray-700">
            Consumer Key
          </label>
          <input
            type="text"
            id="consumerKey"
            {...register('consumerKey', { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="consumerSecret" className="block text-sm font-medium text-gray-700">
            Consumer Secret
          </label>
          <input
            type="password"
            id="consumerSecret"
            {...register('consumerSecret', { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;