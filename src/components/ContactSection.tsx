import { FunctionComponent, useState } from "react";

const ContactSection: FunctionComponent = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="w-full bg-[#FFFFFF] py-6 sm:py-8 lg:py-[26px] px-4 sm:px-6 lg:px-[84px]">
      <div className="max-w-[1440px] mx-auto bg-[#F6F6F6] rounded-[30px] px-6 sm:px-10 lg:px-[80px] py-10 sm:py-12 lg:py-[40px]">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[60px] items-stretch">

        {/* Left: Info */}
        <div className="flex flex-col justify-between gap-8 lg:gap-0 w-full lg:w-[48%]">
          <div className="flex flex-col gap-4">
            <h2
              className="text-[32px] sm:text-[36px] lg:text-[40px] font-[700] leading-[125%] tracking-[-0.02em] text-[#04040e]"
              style={{ fontFamily: "Satoshi" }}
            >
              Want to Know More About ResAI?
            </h2>
            <p
              className="text-[18px] sm:text-[20px] lg:text-[24px] font-[500] leading-[132%] tracking-[0.02em] text-[#535353]"
              style={{ fontFamily: "Satoshi" }}
            >
              Get in touch with us and our team will help you get started.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-6 lg:mt-auto">
            {/* Address Card */}
            <div className="bg-[#0D0D0D] rounded-[16px] px-6 py-5 flex flex-col gap-2">
              <span className="text-white">
                {/* Pin Icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="white"/>
                </svg>
              </span>
              <p className="text-white text-[16px] font-[700] leading-[132%] tracking-[0.02em]" style={{ fontFamily: "Satoshi" }}>Address</p>
              <p className="text-[#ADADAD] text-[14px] sm:text-[15px] font-[400] leading-[150%]" style={{ fontFamily: "Satoshi" }}>
                2972 Westheimer Rd. Santa Ana, Illinois 85486
              </p>
            </div>

            {/* Phone + Email Cards */}
            <div className="flex flex-row gap-4">
              {/* Phone */}
              <div className="bg-[#0D0D0D] rounded-[16px] px-5 py-5 flex flex-col gap-2 flex-1">
                <span className="text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/>
                  </svg>
                </span>
                <p className="text-white text-[16px] font-[700] leading-[132%] tracking-[0.02em]" style={{ fontFamily: "Satoshi" }}>Phone</p>
                <p className="text-[#ADADAD] text-[13px] sm:text-[14px] font-[400]" style={{ fontFamily: "Satoshi" }}>
                  (480) 555-0103
                </p>
              </div>

              {/* Email */}
              <div className="bg-[#0D0D0D] rounded-[16px] px-5 py-5 flex flex-col gap-2 flex-1">
                <span className="text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="white"/>
                  </svg>
                </span>
                <p className="text-white text-[16px] font-[700] leading-[132%] tracking-[0.02em]" style={{ fontFamily: "Satoshi" }}>Email</p>
                <p className="text-[#ADADAD] text-[13px] sm:text-[14px] font-[400]" style={{ fontFamily: "Satoshi" }}>
                  Xyzbsu@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-[52%] bg-white rounded-[20px] p-6 sm:p-8 flex flex-col gap-5 shadow-sm border border-[#E8E8E8]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* First + Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[14px] font-[700] text-[#04040e]" style={{ fontFamily: "Satoshi" }}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full border border-[#E0E0E0] rounded-[10px] px-4 py-3 text-[14px] text-[#04040e] placeholder-[#ADADAD] outline-none focus:border-[#04040e] transition-colors bg-[#F9F9F9]"
                  style={{ fontFamily: "Satoshi" }}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[14px] font-[700] text-[#04040e]" style={{ fontFamily: "Satoshi" }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full border border-[#E0E0E0] rounded-[10px] px-4 py-3 text-[14px] text-[#04040e] placeholder-[#ADADAD] outline-none focus:border-[#04040e] transition-colors bg-[#F9F9F9]"
                  style={{ fontFamily: "Satoshi" }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-[700] text-[#04040e]" style={{ fontFamily: "Satoshi" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full border border-[#E0E0E0] rounded-[10px] px-4 py-3 text-[14px] text-[#04040e] placeholder-[#ADADAD] outline-none focus:border-[#04040e] transition-colors bg-[#F9F9F9]"
                style={{ fontFamily: "Satoshi" }}
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-[700] text-[#04040e]" style={{ fontFamily: "Satoshi" }}>
                Phone Number
              </label>
              <div className="flex items-center border border-[#E0E0E0] rounded-[10px] bg-[#F9F9F9] overflow-hidden focus-within:border-[#04040e] transition-colors">
                <div className="flex items-center gap-1 px-3 border-r border-[#E0E0E0] shrink-0">
                  {/* US Flag */}
                  <span className="text-[18px]">🇺🇸</span>
                  <span className="text-[14px] font-[700] text-[#04040e]" style={{ fontFamily: "Satoshi" }}>US</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5H7z" fill="#535353"/>
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="flex-1 px-3 py-3 text-[14px] text-[#04040e] placeholder-[#ADADAD] outline-none bg-transparent"
                  style={{ fontFamily: "Satoshi" }}
                />
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-[700] text-[#04040e]" style={{ fontFamily: "Satoshi" }}>
                Messages
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                className="w-full border border-[#E0E0E0] rounded-[10px] px-4 py-3 text-[14px] text-[#04040e] placeholder-[#ADADAD] outline-none focus:border-[#04040e] transition-colors bg-[#F9F9F9] resize-none"
                style={{ fontFamily: "Satoshi" }}
              />
            </div>

            {/* Send Button */}
            <div className="group flex items-center w-full cursor-pointer relative mt-1">
              {/* Main pill button */}
              <button
                type="submit"
                className="
                  h-[51px] flex-1
                  pl-[24px] pr-[24px]
                  group-hover:pr-[76px]
                  rounded-full
                  bg-[#dabf67]
                  group-hover:bg-[#c7aa4d]
                  flex items-center justify-center
                  transition-all duration-500 ease-in-out
                  relative z-10
                "
              >
                <span
                  className="text-[16px] sm:text-[18px] font-[600] text-[#04040e] whitespace-nowrap"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Send Message
                </span>
              </button>

              {/* Arrow circle — slides behind main button on hover */}
              <div
                className="
                  w-[51px] h-[51px]
                  rounded-full
                  bg-[#dabf67]
                  group-hover:bg-[#c7aa4d]
                  flex items-center justify-center
                  transition-all duration-500 ease-in-out
                  shrink-0
                  group-hover:-translate-x-[51px]
                  group-hover:opacity-0
                  relative z-0
                "
              >
                <img
                  src="/images/img_huge_icon_arrow.svg"
                  alt="Arrow"
                  className="w-5 h-5"
                />
              </div>
            </div>

          </form>
        </div>

      </div>
      </div>
    </section>
  );
};

export default ContactSection;
