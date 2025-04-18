import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      {t(" © 2025 Weatherly. All rights reserved.")}
    </footer>
  );
}
