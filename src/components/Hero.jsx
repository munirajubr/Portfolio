import { ButtonPrimary, ButtonOutline } from "./Button";

const Hero = () => {
  return (
    <section id="home" className="pt-28 lg:pt-36">
      <div className="container items-center lg:grid lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <figure className="rounded-lg img-box w-9 h-9">
              <img
                src="/images/avatar-1.jpg"
                width={40}
                height={40}
                alt="Muniraj portrait"
                className="image-cover"
              />
            </figure>
            <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>
          <h2 className="headline-1 max-w-[15ch]] sm:max-w-[20ch] mt-5 mb-8 lg:mb-10">
            Bringing Creativity into Digital World
          </h2>
          <div className="flex items-center gap-3">
            <ButtonPrimary 
            label="Download CV" 
            icon="download" 
            href="https://drive.google.com/file/d/1Qe7yj6MoWLZWdM26Oub7guV0Oaip45pe/view?usp=sharing"
            />
            <ButtonOutline
            href="#about"
            label="Scroll down"
            icon="arrow_downward"
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <figure className="w-full max-w-[400px] max-h-[500px] ml-auto bg-gradient-to-t from-sky-400 via-25% via-sky-400/40 to-65% rounded-[60px] overflow-hidden">
  <img
    src="/images/hero-banner.png"
    alt="Muniraju B R"
    className="object-contain w-full h-auto"
  />
</figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
