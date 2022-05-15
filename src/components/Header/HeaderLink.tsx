import { Link, Typography } from "@mui/material";

interface HeaderLinkProps {
  href: string;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        color: "rgb(93, 103, 122)",
        "&:hover": {
          color: "#182642",
        },
      }}
    >
      <Typography fontWeight="600">{children}</Typography>
    </Link>
  );
};
