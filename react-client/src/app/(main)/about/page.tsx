'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About ChatApp
            </h1>
            <p className="text-xl text-gray-600">
              Learn more about our mission and vision
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ChatApp was created with the vision of bringing people together
              through seamless, real-time communication. We believe that
              technology should make it easier for people to connect, collaborate,
              and share ideas, regardless of distance or time zones.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our platform combines cutting-edge technology with an intuitive
              user interface to provide the best chat experience possible. Whether
              you're chatting with friends, collaborating with colleagues, or
              connecting with communities, ChatApp is designed to make
              communication effortless and enjoyable.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🚀 Fast & Reliable
              </h3>
              <p className="text-gray-700">
                Built with performance in mind, ChatApp delivers messages
                instantly with minimal latency.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🎨 Modern Design
              </h3>
              <p className="text-gray-700">
                A clean, intuitive interface that's easy to use and visually
                appealing.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🔐 Security First
              </h3>
              <p className="text-gray-700">
                Your data and conversations are protected with industry-standard
                encryption.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                📱 Cross-Platform
              </h3>
              <p className="text-gray-700">
                Access ChatApp from any device - desktop, tablet, or mobile.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Our Team
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ChatApp is developed by a passionate team of engineers, designers,
              and product managers who are dedicated to creating the best
              communication platform possible. We're constantly working to
              improve our service and add new features based on user feedback.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions, suggestions, or feedback, we'd love to
              hear from you. Feel free to reach out to our support team at{' '}
              <a
                href="mailto:support@chatapp.com"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                support@chatapp.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
