export default function Button({ children, textOnly, className, ...props }) {
  let cssClasses = textOnly ? "text-button" : "btn";
  cssClasses += " " + className;
  return <button {...props} className={cssClasses}>{children}</button>;
}
