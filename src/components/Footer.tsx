import { Leaf, Twitter, Linkedin, Github, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2E7D32] dark:bg-zinc-800 text-white py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 dark:bg-white rounded-xl flex items-center justify-center transition-colors duration-300">
                <Leaf className="text-white dark:text-[#4CAF50] text-xl transition-colors duration-300" />
              </div>
              <span className="text-2xl font-bold">AgriForesight</span>
            </div>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              Kami berkomitmen untuk menyediakan data dan prediksi harga beras yang akurat untuk mendukung ketahanan pangan nasional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200" aria-label="GitHub"><Github className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Sumber Data</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight className="mr-2 h-3 w-3" />
                  Badan Pangan Nasional
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight className="mr-2 h-3 w-3" />
                  BPS Indonesia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight className="mr-2 h-3 w-3" />
                  Kementerian Pertanian
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Bantuan</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight className="mr-2 h-3 w-3" />
                  Dokumentasi API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight className="mr-2 h-3 w-3" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight className="mr-2 h-3 w-3" />
                  Kontak Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-gray-300">© 2025 AgriForesight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}