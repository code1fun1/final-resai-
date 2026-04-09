import React, { useState } from 'react';

type MenuItem = {
  text: string;
  active: boolean;
};

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    { text: 'Challenges', active: true },
    { text: 'How its Works?', active: false },
    { text: 'Approach', active: false },
    { text: 'Features', active: false },
    { text: 'Testimonials', active: false },
    { text: 'Pricing', active: false }
  ];

  return (
    <header className="w-full bg-[#f6f6f6] px-4 sm:px-6 ipad-pro:px-[32px] lg:px-[56px] xl:px-[100px] py-4 relative z-50">
      
      <div className="w-full max-w-[1440px] mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div>
          <img 
            src="/images/img_header_logo.png" 
            alt="ResAI Logo" 
            className="w-[100px] sm:w-[120px] md:w-[132px]"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden ipad-pro:flex">
          <div className="flex gap-8 items-center">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`text-base transition-colors ${
                  item.active 
                    ? 'text-[#4e3000] font-medium' 
                    : 'text-[#03030d] hover:text-[#4e3000]'
                }`}
                style={{ fontFamily: 'Satoshi' }}
              >
                {item.text}
              </button>
            ))}
          </div>
        </nav>

        {/* ✅ DESKTOP BUTTONS */}
        <div className="hidden ipad-pro:flex items-center gap-0">
          
          {/* Signup */}
          <button className="bg-[#dabf67] hover:bg-[#c9ae55] px-6 py-2.5 rounded-full transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.1)]">
            <span className="text-[#03030d] font-medium text-base">
              Signup
            </span>
          </button>

          {/* Arrow */}
          <button className="w-10 h-10 flex items-center justify-center bg-[#dabf67] hover:bg-[#c9ae55] rounded-full transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.1)]">
            <img 
              src="/images/img_huge_icon_arrow.svg" 
              alt="Arrow" 
              className="w-4 h-4"
            />
          </button>

        </div>

        {/* Hamburger */}
        <button 
          className="ipad-pro:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="ipad-pro:hidden absolute top-full left-0 right-0 bg-[#f6f6f6] shadow-lg px-4 py-6 flex flex-col gap-4">
          
          <nav className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`text-base text-left ${
                  item.active 
                    ? 'text-[#4e3000] font-medium' 
                    : 'text-[#03030d]'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.text}
              </button>
            ))}
          </nav>

          {/* ✅ MOBILE BUTTONS */}
          <div className="flex items-center gap-0 pt-2 border-t border-[#e0e0e0]">
            
            <button className="bg-[#dabf67] px-5 py-2.5 rounded-full">
              Signup
            </button>

            <button className="w-10 h-10 flex items-center justify-center bg-[#dabf67] rounded-full">
              <img 
                src="/images/img_huge_icon_arrow.svg" 
                alt="Arrow" 
                className="w-4 h-4"
              />
            </button>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;