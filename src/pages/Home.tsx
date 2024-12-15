import Hero from '../components/Home/Hero';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Impact
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Supporting UN Sustainable Development Goal 3
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Improving healthcare accessibility and early detection capabilities for better patient outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}