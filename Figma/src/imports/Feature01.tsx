import svgPaths from "./svg-lz7gd2e2pw";

function DeDkChart({ className }: { className?: string }) {
  return (
    <div className={className || "col-1 ml-[26.5px] mt-[26px] relative row-1 size-[27.5px]"} data-name="DE-DK-Chart">
      <div className="absolute inset-[-1.82%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.5 28.5">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p1e28ce80} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p17733e80} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p1b35b400} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p188de800} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p1e28ce80} fillRule="evenodd" stroke="var(--stroke-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p17733e80} fillRule="evenodd" stroke="var(--stroke-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p1b35b400} fillRule="evenodd" stroke="var(--stroke-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p188de800} fillRule="evenodd" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function DeFeature() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="de-feature">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[80px]" data-name="Deactive-DK- item">
        <div className="-translate-y-1/2 absolute aspect-[58/58] left-0 right-0 top-1/2">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
            <circle cx="40" cy="40" fill="var(--fill-0, #383838)" fillOpacity="0.2" id="Ellipse 74" r="40" />
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute aspect-[58/58] left-[6.88%] right-[5.63%] top-1/2">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
            <circle cx="35" cy="35" fill="var(--fill-0, #383838)" fillOpacity="0.4" id="Ellipse 74" r="35" />
          </svg>
        </div>
        <div className="absolute inset-[12.5%_11.88%_12.5%_13.13%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
            <circle cx="30" cy="30" fill="var(--fill-0, #383838)" fillOpacity="0.6" id="Ellipse 74" r="30" />
          </svg>
        </div>
      </div>
      <DeDkChart />
    </div>
  );
}

function DeFeature1() {
  return (
    <div className="bg-[#383838] h-[110px] overflow-clip relative rounded-[20px] shrink-0 w-[648px]" data-name="de-feature">
      <div className="absolute font-['Arial_Rounded_MT:Light',sans-serif] leading-[0] left-[calc(50%-302px)] not-italic text-[#e5e5e5] text-[0px] top-[10px] w-[605px] whitespace-pre-wrap">
        <p className="font-['Arial_Rounded_MT_Bold:Regular',sans-serif] leading-[30px] mb-0 text-[22px]">Analysis and AI suggestions</p>
        <p className="leading-[28px] text-[20px]">Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.</p>
      </div>
    </div>
  );
}

export default function Feature() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative size-full" data-name="Feature01">
      <DeFeature />
      <DeFeature1 />
    </div>
  );
}