import { Link, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAuth } from "../../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const mobileMenuItemsRef = useRef([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const comp = useRef(null);
  useLayoutEffect(() => {
    const t1 = gsap.timeline();
    t1.fromTo(
      comp.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // Modern button styles
  const navButtonClass =
    "flex items-center justify-center gap-2 text-white hover:text-indigo-100 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 transition-all duration-300";
  const primaryButtonClass =
    "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/50";
  const secondaryButtonClass =
    "bg-gray-800/50 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-600/30 hover:border-indigo-400/50";
  const dangerButtonClass =
    "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-rose-500/30";

  return (
    <>
      <nav
        ref={comp}
        className="bg-[#6867671e] text-white p-4 fixed top-0 w-full z-30 backdrop-blur-md border-b border-gray-700/50"
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold  bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent"
          >
            {/* VELOCE <span className="text-white">CarWash</span> */}
            <img
              src="https://i.ibb.co/nqCD67pF/quicklogo-removebg-preview.png"
              className="w-[75px] h-[75px] rounded-3xl "
              alt="logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                {user.role === "super-admin" || user.role === "branch-admin" ? (
                  <Link
                    to="/AdminDashboard"
                    className={`${navButtonClass} ${primaryButtonClass}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    {t("navigation.adminDashboard")}
                  </Link>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/profile"
                      className={`${navButtonClass} ${secondaryButtonClass}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      {t("navigation.profile")}
                    </Link>
                    <Link
                      to="/customer/dashboard"
                      className={`${navButtonClass} ${secondaryButtonClass}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                      {t("navigation.dashboard")}
                    </Link>
                    <Link
                      to="/services"
                      className={`${navButtonClass} ${secondaryButtonClass}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                      {t("navigation.services")}
                    </Link>
                    <Link
                      to="/packages"
                      className={`${navButtonClass} ${secondaryButtonClass}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                      {t("navigation.packages")}
                    </Link>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className={`${navButtonClass} ${dangerButtonClass}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                  {t("auth.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${navButtonClass} ${secondaryButtonClass}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  {t("auth.login")}
                </Link>
                <Link
                  to="/register"
                  className={`${navButtonClass} ${primaryButtonClass}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  {t("auth.register")}
                </Link>
                {/* <Link to="/admin/login" className={`${navButtonClass} ${secondaryButtonClass}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    {t('auth.adminLogin')}
                                </Link> */}
              </>
            )}
            <Link
              to="/AboutUs"
              className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
              onClick={() => setOpen(false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              {t("home.about.AboutUs")}
            </Link>
            <LanguageSwitcher className="ml-2" />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-[#6867671e] backdrop-blur-lg border-r border-gray-700/50 shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <Link
                  to="/"
                  className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
                  onClick={() => setOpen(false)}
                >
                  {/* Veloce<span className="text-white">CarWash</span> */}
                  <img
                    src="https://i.ibb.co/nqCD67pF/quicklogo-removebg-preview.png"
                    className="w-[75px] h-[75px] rounded-full"
                    alt="logo"
                  />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <nav className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                {user ? (
                  <>
                    {user.role === "super-admin" ||
                    user.role === "branch-admin" ? (
                      <Link
                        to="/AdminDashboard"
                        className={`${navButtonClass} ${primaryButtonClass} justify-start`}
                        onClick={() => setOpen(false)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        {t("navigation.adminDashboard")}
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                          onClick={() => setOpen(false)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          {t("navigation.profile")}
                        </Link>
                        <Link
                          to="/customer/dashboard"
                          className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                          onClick={() => setOpen(false)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                          </svg>
                          {t("navigation.dashboard")}
                        </Link>
                        <Link
                          to="/services"
                          className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                          onClick={() => setOpen(false)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                          </svg>
                          {t("navigation.services")}
                        </Link>
                        <Link
                          to="/packages"
                          className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                          onClick={() => setOpen(false)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                          </svg>
                          {t("navigation.packages")}
                        </Link>
                      </>
                    )}
                    <Link
                      to="/AboutUs"
                      className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                      onClick={() => setOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width={24}
                        height={24}
                        viewBox="0 0 50 50"
                        fill="white"
                        stroke="currentColor"
                      >
                        <path d="M 25 1 C 11.222656 1 0 10.878906 0 23.1875 C 0 29.234375 2.773438 34.664063 7.21875 38.6875 C 6.546875 40.761719 5.046875 42.398438 3.53125 43.65625 C 2.714844 44.332031 1.933594 44.910156 1.3125 45.46875 C 1.003906 45.746094 0.722656 46.027344 0.5 46.375 C 0.277344 46.722656 0.078125 47.21875 0.21875 47.75 L 0.34375 48.15625 L 0.6875 48.375 C 1.976563 49.117188 3.582031 49.246094 5.3125 49.125 C 7.042969 49.003906 8.929688 48.605469 10.78125 48.09375 C 14.375 47.101563 17.75 45.6875 19.53125 44.90625 C 21.289063 45.273438 23.054688 45.5 24.90625 45.5 C 38.683594 45.5 49.90625 35.621094 49.90625 23.3125 C 49.90625 11.007813 38.78125 1 25 1 Z M 25 3 C 37.820313 3 47.90625 12.214844 47.90625 23.3125 C 47.90625 34.402344 37.730469 43.5 24.90625 43.5 C 23.078125 43.5 21.355469 43.320313 19.625 42.9375 L 19.28125 42.84375 L 19 43 C 17.328125 43.738281 13.792969 45.179688 10.25 46.15625 C 8.476563 46.644531 6.710938 47.019531 5.1875 47.125 C 4.167969 47.195313 3.539063 46.953125 2.84375 46.78125 C 3.339844 46.355469 4.019531 45.847656 4.8125 45.1875 C 6.554688 43.742188 8.644531 41.730469 9.375 38.75 L 9.53125 38.125 L 9.03125 37.75 C 4.625 34.015625 2 28.875 2 23.1875 C 2 12.097656 12.175781 3 25 3 Z M 23.8125 12.8125 C 23.511719 12.8125 23.40625 12.988281 23.40625 13.1875 L 23.40625 15.8125 C 23.40625 16.113281 23.613281 16.1875 23.8125 16.1875 L 26.1875 16.1875 C 26.488281 16.1875 26.59375 16.011719 26.59375 15.8125 L 26.59375 13.1875 C 26.59375 12.886719 26.386719 12.8125 26.1875 12.8125 Z M 23.90625 20.09375 C 23.605469 20.09375 23.5 20.300781 23.5 20.5 L 23.5 33.90625 C 23.5 34.207031 23.707031 34.3125 23.90625 34.3125 L 23.90625 34.40625 L 26.1875 34.40625 C 26.488281 34.40625 26.59375 34.199219 26.59375 34 L 26.59375 20.5 C 26.59375 20.199219 26.386719 20.09375 26.1875 20.09375 Z"></path>
                      </svg>
                      {t("home.about.AboutUs")}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className={`${navButtonClass} ${dangerButtonClass} justify-start mt-auto`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                      >
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                      {t("auth.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                      onClick={() => setOpen(false)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                      </svg>
                      {t("auth.login")}
                    </Link>
                    <Link
                      to="/register"
                      className={`${navButtonClass} ${primaryButtonClass} justify-start`}
                      onClick={() => setOpen(false)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                      {t("auth.register")}
                    </Link>
                    <Link
                      to="/AboutUs"
                      className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                      onClick={() => setOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width={24}
                        height={24}
                        viewBox="0 0 50 50"
                        fill="white"
                        stroke="currentColor"
                      >
                        <path d="M 25 1 C 11.222656 1 0 10.878906 0 23.1875 C 0 29.234375 2.773438 34.664063 7.21875 38.6875 C 6.546875 40.761719 5.046875 42.398438 3.53125 43.65625 C 2.714844 44.332031 1.933594 44.910156 1.3125 45.46875 C 1.003906 45.746094 0.722656 46.027344 0.5 46.375 C 0.277344 46.722656 0.078125 47.21875 0.21875 47.75 L 0.34375 48.15625 L 0.6875 48.375 C 1.976563 49.117188 3.582031 49.246094 5.3125 49.125 C 7.042969 49.003906 8.929688 48.605469 10.78125 48.09375 C 14.375 47.101563 17.75 45.6875 19.53125 44.90625 C 21.289063 45.273438 23.054688 45.5 24.90625 45.5 C 38.683594 45.5 49.90625 35.621094 49.90625 23.3125 C 49.90625 11.007813 38.78125 1 25 1 Z M 25 3 C 37.820313 3 47.90625 12.214844 47.90625 23.3125 C 47.90625 34.402344 37.730469 43.5 24.90625 43.5 C 23.078125 43.5 21.355469 43.320313 19.625 42.9375 L 19.28125 42.84375 L 19 43 C 17.328125 43.738281 13.792969 45.179688 10.25 46.15625 C 8.476563 46.644531 6.710938 47.019531 5.1875 47.125 C 4.167969 47.195313 3.539063 46.953125 2.84375 46.78125 C 3.339844 46.355469 4.019531 45.847656 4.8125 45.1875 C 6.554688 43.742188 8.644531 41.730469 9.375 38.75 L 9.53125 38.125 L 9.03125 37.75 C 4.625 34.015625 2 28.875 2 23.1875 C 2 12.097656 12.175781 3 25 3 Z M 23.8125 12.8125 C 23.511719 12.8125 23.40625 12.988281 23.40625 13.1875 L 23.40625 15.8125 C 23.40625 16.113281 23.613281 16.1875 23.8125 16.1875 L 26.1875 16.1875 C 26.488281 16.1875 26.59375 16.011719 26.59375 15.8125 L 26.59375 13.1875 C 26.59375 12.886719 26.386719 12.8125 26.1875 12.8125 Z M 23.90625 20.09375 C 23.605469 20.09375 23.5 20.300781 23.5 20.5 L 23.5 33.90625 C 23.5 34.207031 23.707031 34.3125 23.90625 34.3125 L 23.90625 34.40625 L 26.1875 34.40625 C 26.488281 34.40625 26.59375 34.199219 26.59375 34 L 26.59375 20.5 C 26.59375 20.199219 26.386719 20.09375 26.1875 20.09375 Z"></path>
                      </svg>
                      {t("home.about.AboutUs")}
                    </Link>
                    {/* <Link 
                                            to="/admin/login" 
                                            className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                                            onClick={() => setOpen(false)}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            {t('auth.adminLogin')}
                                        </Link> */}
                  </>
                )}

                <div className="mt-4">
                  <LanguageSwitcher className="w-full" />
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
