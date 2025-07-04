export const Footer: React.FC = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
    <aside>
        <p>&copy; {new Date().getFullYear()} Made with &hearts; in Hamburg City</p>
      </aside>
    </footer>
  );
};