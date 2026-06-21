import { useState } from "react";
import { Plus, X } from "lucide-react";

export type Social = {
  platform: string;
  label: string;
  url: string;
};

export const SOCIAL_PLATFORMS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    placeholder: "linkedin.com/in/username",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    placeholder: "github.com/username",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    placeholder: "instagram.com/username",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    placeholder: "facebook.com/username",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    label: "X / Twitter",
    placeholder: "x.com/username",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
  {
    id: "pinterest",
    label: "Pinterest",
    placeholder: "pinterest.com/username",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    id: "dribbble",
    label: "Dribbble",
    placeholder: "dribbble.com/username",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.37 1.73 1.35 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.176zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.46 0-.91.032-1.35.092zm10.507 3.178c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
      </svg>
    ),
  },
  {
    id: "behance",
    label: "Behance",
    placeholder: "behance.net/username",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.97 13h4.406c-.148-1.872-1.024-2.368-1.97-2.368-.978 0-1.934.517-2.05 2.368zM.002 11.566V5H6.78c3.053 0 4.826 1.028 4.826 3.534 0 1.566-.617 2.664-2.136 3.2C11.1 12.2 12 13.36 12 15.5c0 3.19-2.455 4.5-5.712 4.5H0l.002-8.434zm3.17-4.14v2.538h3.28c1.13 0 1.82-.456 1.82-1.316 0-.891-.69-1.222-1.82-1.222H3.17zm0 4.854v2.944h3.64c1.234 0 1.99-.504 1.99-1.456 0-.995-.756-1.488-1.99-1.488H3.17z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    placeholder: "youtube.com/@username",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "website",
    label: "Portfolio",
    placeholder: "yourwebsite.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

type AddSocialsProps = {
  data: Social[];
  onChange: (socials: Social[]) => void;
};

const AddSocials = ({ data, onChange }: AddSocialsProps) => {
  const [selected, setSelected] = useState("");
  const [url, setUrl] = useState("");

  const addedIds = data.map((s) => s.platform);
  const availablePlatforms = SOCIAL_PLATFORMS.filter((p) => !addedIds.includes(p.id));
  const selectedPlatform = SOCIAL_PLATFORMS.find((p) => p.id === selected);
  const isValid = selected && url.trim();

  const handleAdd = () => {
    if (!isValid || !selectedPlatform) return;
    onChange([...data, { platform: selected, label: selectedPlatform.label, url: url.trim() }]);
    setSelected("");
    setUrl("");
  };

  const handleRemove = (platform: string) => {
    onChange(data.filter((s) => s.platform !== platform));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-1/2 py-2 px-3 text-sm border border-gray-600 rounded bg-transparent text-white"
          >
            <option value="" className="bg-zinc-900">Select platform...</option>
            {availablePlatforms.map((p) => (
              <option key={p.id} value={p.id} className="bg-zinc-900">
                {p.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder={selectedPlatform?.placeholder ?? "Enter URL"}
            className="w-1/2 py-2 px-3 text-sm border border-gray-600 rounded bg-transparent"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!isValid}
          className="flex items-center justify-center gap-2 py-2 px-4 text-sm border border-gray-600 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          <Plus className="size-4" />
          Add Social
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((social) => {
            const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform);
            return (
              <div
                key={social.platform}
                className="flex items-center gap-2 pl-3 pr-2 py-1.5 border border-gray-600 rounded-full text-sm"
              >
                <span className="text-gray-400 flex items-center">{platform?.icon}</span>
                <span className="font-medium text-white">{social.label}</span>
                <button
                  onClick={() => handleRemove(social.platform)}
                  className="opacity-50 hover:opacity-100 transition-opacity ml-1"
                  aria-label={`Remove ${social.label}`}
                >
                  <X className="size-3" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p className="text-sm">No socials added — totally optional</p>
        </div>
      )}
    </div>
  );
};

export default AddSocials;