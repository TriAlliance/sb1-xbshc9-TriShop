import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Search } from 'lucide-react';
import { searchProducts } from '../services/woocommerceService';

type SearchFormData = {
  category: string;
  productNames: string;
  skus: string;
  upcs: string;
  barcodes: string;
  minPrice: string;
  maxPrice: string;
  minStock: string;
  maxStock: string;
  createdFrom: string;
  createdTo: string;
  modifiedFrom: string;
  modifiedTo: string;
  status: string;
  sortBy: string;
  sortOrder: string;
};

const ProductManager: React.FC = () => {
  const { register, handleSubmit, control } = useForm<SearchFormData>();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const searchMutation = useMutation(searchProducts, {
    onSuccess: (data) => {
      setSearchResults(data);
      toast.success('Products found');
    },
    onError: () => {
      toast.error('Failed to search products');
    },
  });

  const onSubmit = (data: SearchFormData) => {
    searchMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">WooCommerce Product Manager</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4 bg-blue-500 text-white p-2 rounded">Search Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category/Subcategory
            </label>
            <select
              {...register('category')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">All Categories</option>
              {/* Add category options here */}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productNames">
              Product Name(s)
            </label>
            <textarea
              {...register('productNames')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="One per line"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skus">
              SKU(s)
            </label>
            <textarea
              {...register('skus')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="One per line"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upcs">
              UPC(s)
            </label>
            <textarea
              {...register('upcs')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="One per line"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barcodes">
              Barcode(s)
            </label>
            <textarea
              {...register('barcodes')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="One per line"
            />
          </div>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minPrice">
                Min Price
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  $
                </span>
                <input
                  {...register('minPrice')}
                  type="number"
                  className="rounded-none rounded-r-lg border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="Min Price"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxPrice">
                Max Price
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  $
                </span>
                <input
                  {...register('maxPrice')}
                  type="number"
                  className="rounded-none rounded-r-lg border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="Max Price"
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minStock">
                Min Stock
              </label>
              <input
                {...register('minStock')}
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Min Stock"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxStock">
                Max Stock
              </label>
              <input
                {...register('maxStock')}
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Max Stock"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createdFrom">
              Created From
            </label>
            <Controller
              name="createdFrom"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createdTo">
              Created To
            </label>
            <Controller
              name="createdTo"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modifiedFrom">
              Modified From
            </label>
            <Controller
              name="modifiedFrom"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modifiedTo">
              Modified To
            </label>
            <Controller
              name="modifiedTo"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Product Status
            </label>
            <select
              {...register('status')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">All Statuses</option>
              <option value="publish">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sortBy">
              Sort By
            </label>
            <select
              {...register('sortBy')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="date">Date</option>
              <option value="id">ID</option>
              <option value="include">Include</option>
              <option value="title">Title</option>
              <option value="slug">Slug</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sortOrder">
              Sort Order
            </label>
            <select
              {...register('sortOrder')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center mx-auto"
            disabled={searchMutation.isLoading}
          >
            <Search className="mr-2" />
            Search
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {searchResults.map((product) => (
              <li key={product.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {product.name}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Price: ${product.price}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        Stock: {product.stock_quantity}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Status: {product.status}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductManager;