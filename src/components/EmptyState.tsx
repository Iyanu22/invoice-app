export default function EmptyState() {
  return (
    <div className="empty">

      {/* Illustration */}
      <svg className="e-art" viewBox="0 0 264 200" fill="none">
        <ellipse cx="132" cy="190" rx="90" ry="10" fill="currentColor" fillOpacity=".04" />
        {/* Envelope */}
        <rect x="42" y="88" width="180" height="108" rx="10" fill="#1E2139" />
        <rect x="42" y="88" width="180" height="108" rx="10" stroke="#252945" strokeWidth="1.5" />
        <path d="M42 98 L132 148 L222 98" stroke="#252945" strokeWidth="1.5" fill="none" />
        {/* Body */}
        <rect x="108" y="90" width="48" height="58" rx="10" fill="#9277FF" />
        {/* Head */}
        <circle cx="132" cy="70" r="24" fill="#7C5DFA" />
        {/* Hair */}
        <path d="M110 66 Q112 50 132 48 Q152 50 154 66" fill="#4B3FCE" />
        {/* Eyes */}
        <circle cx="124" cy="66" r="3" fill="white" />
        <circle cx="140" cy="66" r="3" fill="white" />
        {/* Smile */}
        <path
          d="M125 76 Q132 82 139 76"
          stroke="white" strokeWidth="2"
          strokeLinecap="round" fill="none"
        />
        {/* Arms */}
        <path d="M108 102 L82 122" stroke="#9277FF" strokeWidth="11" strokeLinecap="round" />
        <path d="M156 102 L182 122" stroke="#9277FF" strokeWidth="11" strokeLinecap="round" />
        {/* Paper right */}
        <rect
          x="172" y="38" width="34" height="44" rx="5"
          fill="#DFE3FA" transform="rotate(-18 172 38)"
        />
        <line x1="178" y1="50" x2="197" y2="47" stroke="#888EB0" strokeWidth="2" strokeLinecap="round" />
        <line x1="178" y1="57" x2="196" y2="54" stroke="#888EB0" strokeWidth="2" strokeLinecap="round" />
        <line x1="178" y1="64" x2="194" y2="62" stroke="#888EB0" strokeWidth="2" strokeLinecap="round" />
        {/* Paper left */}
        <rect
          x="55" y="42" width="26" height="34" rx="4"
          fill="#DFE3FA" transform="rotate(14 55 42)"
        />
        <line x1="60" y1="52" x2="76" y2="55" stroke="#888EB0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="60" y1="59" x2="76" y2="62" stroke="#888EB0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <h2>There is nothing here</h2>
      <p>
        Create an invoice by clicking the{" "}
        <strong>New Invoice</strong> button and get started
      </p>

    </div>
  );
}