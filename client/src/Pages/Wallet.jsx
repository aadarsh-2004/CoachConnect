import React from 'react';
import { 
  PhoneCall, 
  Video, 
  MessageCircle, 
  Wallet2, 
  ArrowDownCircle, 
  ArrowUpCircle,
  Building2,
  History,
  ChevronDown
} from 'lucide-react';

const Wallet = () => {
  const earnings = {
    overall: 0,
    voice: 0,
    video: 0,
    chat: 0
  };

  const transactions = [];

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-4 md:p-6 lg:p-8">
      {/* Background gradients */}
      <div className='absolute top-[10px] left-[0%] w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 blur-2xl z-0'></div>
      {/* <div className='absolute bottom-[20px] right-[-50%] w-56 h-56 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-800/20 blur-xl z-0'></div> */}
      {/* <div className='absolute top-[55%] right-[0%] w-24 h-24 rounded-full bg-gradient-to-r from-purple-900/20 to-cyan-400/20 blur-lg z-0'></div> */}

      {/* Main Container with Grid Layout */}
      <div className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-8 ">
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

            {/* Earnings Grid for Mobile and Tablet */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-900/50  backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <Wallet2 className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Overall earnings</div>
                    <div className="text-2xl font-bold text-white">₹ {earnings.overall}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <PhoneCall className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Voice call earning</div>
                    <div className="text-2xl font-bold text-white">₹ {earnings.voice}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50  backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Video className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Video call earning</div>
                    <div className="text-2xl font-bold text-white">₹ {earnings.video}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50  backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-500/20 rounded-xl">
                    <MessageCircle className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Online Chat earning</div>
                    <div className="text-2xl font-bold text-white">₹ {earnings.chat}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions Section */}
            <div className="bg-gray-900/50  backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <History className="h-5 w-5 text-teal-500" />
                <h2 className="text-xl text-white">Transaction History</h2>
              </div>
              
              {transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-gray-200">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="py-3 px-2">Mode</th>
                        <th className="py-3 px-2">Date</th>
                        <th className="py-3 px-2">Time</th>
                        <th className="py-3 px-2">Transaction ID</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, index) => (
                        <tr key={index}>
                          {/* Transaction row data would go here */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <img 
                    src="/api/placeholder/120/120" 
                    alt="No transactions" 
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p className="text-xl text-gray-400">No transaction history found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Wallet Actions */}
          <div className="lg:col-span-1 mt-0 md:mt-9 ">
            <div className="bg-gray-900/50  backdrop-blur-sm rounded-xl p-6 sticky top-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-gray-400">Available Balance</h3>
                  <p className="text-3xl font-bold text-white mt-1">₹ 0</p>
                </div>
                <div className="bg-gradient-to-r from-white to-white p-3 rounded-xl">
                  <Wallet2 className="h-6 w-6 text-black" />
                </div>
              </div>

              <div className="mb-8">
                <p className="text-gray-400 text-sm">Withdrawable amount</p>
                <p className="text-xl font-semibold text-white mt-1">₹ 0</p>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-cyan-400 to-cyan-400 text-black py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition">
                  <ArrowDownCircle className="h-5 w-5" />
                  Add cash
                </button>
                
                <button className="w-full bg-white text-black py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-600 transition">
                  <ArrowUpCircle className="h-5 w-5" />
                  Withdraw
                </button>
              </div>

              <div className="mt-8">
                <button className="w-full bg-slate-700 p-4 rounded-xl text-white hover:bg-slate-600 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-blue-400" />
                      <div className="text-left">
                        <p className="font-medium">Bank Account Details</p>
                        <p className="text-emerald-400 text-sm">Verified</p>
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
