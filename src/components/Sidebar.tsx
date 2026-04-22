
import { LogoMark, MoonIcon, SunIcon } from "./Icons";
import { useTheme } from "../context/useTheme";
import avatarImg from "../assets/avatar.png";

interface Props {
  onLogoClick: () => void;
}

export default function Sidebar({ onLogoClick }: Props) {
  const { dark, toggleTheme } = useTheme();

  return (
    <nav className="sb" aria-label="Main navigation">

      {/* Logo */}
      <div
        className="sb-top"
        role="button"
        tabIndex={0}
        onClick={onLogoClick}
        onKeyDown={(e) => e.key === "Enter" && onLogoClick()}
        aria-label="Go to invoice list"
        style={{ background: "none", padding: 0 }}
      >
        <LogoMark />
      </div>

      <div className="sb-bot">

        {/* Theme toggle */}
        <button
          className="sb-ibtn"
          onClick={toggleTheme}
          type="button"
          aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className="sb-hr" />

        {/* Avatar */}
        <div
          className="sb-av"
          role="img"
          aria-label="User avatar"
        >
          <img 
          src={avatarImg} 
          alt="Profile" 
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%',
            objectFit: 'cover'
          }} 
        />
        </div>

      </div>
    </nav>
  );
}