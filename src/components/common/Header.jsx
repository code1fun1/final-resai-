import React, { useState } from 'react';
import Button from '../ui/Button';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { text: 'Challenges', active: true },
    { text: 'How its Works?', active: false },
    { text: 'Approach', active: false },
    { text: 'Features', active: false },
    { text: 'Testimonials', active: false },
    { text: 'Pricing', active: false }
  ];

  return (
    <header className="w-full bg-[#f6f6f6] px-4 sm:px-6 lg:px-[100px] py-4 relative z-50">
      <div className="w-full max-w-[1440px] mx-auto flex flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            src="/images/img_header_logo.png" 
            alt="ResAI Logo" 
            className="w-[100px] sm:w-[120px] md:w-[132px] h-auto"
          />
        </div>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden lg:flex">
          <div className="flex flex-row gap-[32px] justify-center items-center">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                role="menuitem"
                className={`text-base font-medium leading-[22px] text-center transition-colors ${
                  item?.active 
                    ? 'text-[#4e3000] font-medium' 
                    : 'text-[#03030d] font-normal hover:text-[#4e3000]'
                }`}
                style={{ fontFamily: 'Satoshi' }}
              >
                {item?.text}
              </button>
            ))}
          </div>
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden lg:flex flex-row justify-center items-center gap-0">
          <Button
            text="Signup"
            text_font_size="18"
            text_font_family="Satoshi"
            text_font_weight="500"
            text_line_height="22px"
            text_text_align="center"
            text_color="#03030d"
            fill_background_color="#dabf67"
            border_border_radius="24px"
            border_border="none"
            layout_width="auto"
            position="relative"
            margin="0"
            variant="filled"
            size="md"
            onClick={() => {}}
            padding="12px 32px"
            className=""
          />
          
          <button 
            className="w-[48px] h-[48px] bg-[#dabf67] rounded-[24px] flex items-center justify-center ml-4 hover:opacity-90 transition-opacity"
            aria-label="Arrow Link"
          >
            <img 
              src="/images/img_huge_icon_arrow.svg" 
              alt="Arrow" 
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Hamburger Menu Icon (Mobile only) */}
        <button 
          className="flex lg:hidden p-2" 
          aria-label="Open menu"
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

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#f6f6f6] shadow-lg z-50 px-4 py-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-4">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                role="menuitem"
                className={`text-base font-medium leading-[22px] text-left transition-colors ${
                  item?.active 
                    ? 'text-[#4e3000] font-medium' 
                    : 'text-[#03030d] font-normal hover:text-[#4e3000]'
                }`}
                style={{ fontFamily: 'Satoshi' }}
                onClick={() => setMenuOpen(false)}
              >
                {item?.text}
              </button>
            ))}
          </nav>
          <div className="flex flex-row items-center gap-3 pt-2 border-t border-[#e0e0e0]">
            <Button
              text="Signup"
              text_font_size="16"
              text_font_family="Satoshi"
              text_font_weight="500"
              text_line_height="22px"
              text_text_align="center"
              text_color="#03030d"
              fill_background_color="#dabf67"
              border_border_radius="24px"
              border_border="none"
              layout_width="auto"
              position="relative"
              margin="0"
              variant="filled"
              size="md"
              onClick={() => {}}
              padding="10px 24px"
              className=""
            />
            <button 
              className="w-[44px] h-[44px] bg-[#dabf67] rounded-[22px] flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Arrow Link"
            >
              <img 
                src="/images/img_huge_icon_arrow.svg" 
                alt="Arrow" 
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;