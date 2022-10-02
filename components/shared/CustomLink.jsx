import Link from "next/link";

const CustomLink = ({ children, href, noLink, ...props }) => {
  return (
    <>
      {noLink ? (
        <a>{children}</a>
      ) : (
        <Link href={href} {...props}>
          {children}
        </Link>
      )}
    </>
  );
};

export default CustomLink;
