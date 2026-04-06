import { footerContent } from "@/lib/content";

export function Footer() {
  return (
    <footer id="contact-us" className="bg-[#273854] px-6 py-10 text-[#FCF4EA] md:px-8 md:py-14">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_220px_220px]">
          <div className="space-y-0.5 text-[28px] font-medium leading-[0.95] tracking-[-0.04em] md:text-[34px]">
            {footerContent.brand.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="space-y-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">Company</p>
            <div className="space-y-2.5 text-[24px] font-semibold leading-none">
              {footerContent.company.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">Socials</p>
            <div className="space-y-2.5 text-[24px] font-semibold leading-none">
              {footerContent.socials.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_180px_1fr] lg:items-end">
          <div className="max-w-[360px] space-y-5">
            <p className="text-[24px] font-black leading-[1.38] tracking-[-0.02em]">
              {footerContent.statement}
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/55">
              {footerContent.status}
            </p>
          </div>
          <div className="text-center text-[10px] uppercase tracking-[0.25em] text-[#3656d2]">
            Agency
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {footerContent.locations.map((location, index) => (
              <div key={`${location.join("-")}-${index}`} className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/55">{location[0]}</p>
                <div className="space-y-1 text-sm text-white/90">
                  <p>{location[1]}</p>
                  <p>{location[2]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
