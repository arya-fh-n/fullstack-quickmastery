import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './components/ProductList';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Product Management System</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <ProductList />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;