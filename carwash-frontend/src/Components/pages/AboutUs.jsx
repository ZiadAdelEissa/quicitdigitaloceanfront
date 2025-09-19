import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../Shared/Footer";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
gsap.registerPlugin(ScrollTrigger);

export default function AboutUs () {
    const { t } = useTranslation();
  const comp = useRef(null);
  const aboutSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const leftElementRef = useRef(null);
  const [expand , setExpand] = useState (false);

  const handleMouseEnter = () =>{
    setExpand(true);
  }
  const handleMouseLeave = ()=> {
    setExpand(false);
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (comp.current) {
        gsap.fromTo(
          comp.current,
          { opacity: 0, y: 50, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
        );
      }

      if (aboutSectionRef.current) {
        gsap.fromTo(
          aboutSectionRef.current,
          { opacity: 0, y: 100, skewY: 3 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "top 85%",
              end: "bottom 20%",
            },
          }
        );
      }

      if (servicesSectionRef.current) {
        gsap.fromTo(
          servicesSectionRef.current,
          { opacity: 0, y: 100, skewY: 3 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: servicesSectionRef.current,
              start: "top 85%",
              end: "bottom 20%",
            },
          }
        );
      }

      if (leftElementRef.current) {
        gsap.fromTo(
          leftElementRef.current,
          { x: -150, opacity: 0, rotateY: 15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftElementRef.current,
              start: "top 80%",
              end: "top 40%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);
    return(
    < div className="About flex flex-col justify-center items-center w-full h-full max-lg:mt-16">
         <h1 className="text-4xl mt-16 bg-gradient-to-r from-orange-400 to-pink-600 h-16 inline-block text-transparent bg-clip-text">
          {t('home.about.AboutUs')}
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 content-center items-center  gap-24 lg:grid-cols-1 mt-16 p-2">
          <div  className="left flex justify-center items-center w-full  ">
            <img
              src="https://i.ibb.co/5gxBgtVR/quiq-it-logo.jpg" 
              alt={t('home.about.imageAlt')}
              className="  w-[500px]  rounded-lg "
            />
          </div>
          <div className="right flex flex-col items-center justify-centre text-center text-white  ">
            {[11, 222, 333].map((num) => (
              <p key={num} className="text-xl mb-8 p-4 max-w-2xl">
                {t(`home.about.paragraph${num}`)}
              </p>
            ))}
          </div>
        </div>
       
    </div>
    );
}