import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  TicketIcon,
  XMarkIcon,
  Bars3Icon,
  GiftIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        variant="paragraph"
        className="flex items-center gap-2 font-medium"
        placeholder=""
        onPointerEnter={() => {}}
        onPointerLeave={() => {}}
      >
        {children}
      </Typography>
    </li>
  );
}

const NAV_MENU = [
    {
      name: "Register",
      icon: GiftIcon,
      href: "/register",
    },
    {
      name: "Login",
      icon: TicketIcon,
      href: "/login",
    },
  ];

export function Navbarterms() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePointerEnter = () => {
    // Add your pointer enter logic here
  };

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      blurred={true}
      color={isScrolling ? "white" : "transparent"} // Change this to your desired solid color
      className="fixed top-0 z-50 border-0"
      placeholder=""
      onPointerEnter={() => {}}
      onPointerLeave={() => {}}
      
    >
      <div className="container mx-auto flex items-center justify-between">
      <Link href="/">
      <Typography
          color={isScrolling ? "black" : "black"}
          className="text-md font-bold uppercase"
          placeholder=""
          onPointerEnter={() => {}}
          onPointerLeave={() => {}}
        >
          Ecosphere
        </Typography>
        </Link>
        <div className="hidden items-center gap-4 lg:flex">
        
          <Link href="/register">
          <Button color={isScrolling ? "black" : "black"} variant="text" placeholder=""
        onPointerEnter={() => {}}
        onPointerLeave={() => {}}>
            Register
          </Button>
          </Link>
            <Link href="/login">
              <Button
                color={isScrolling ? "black" : "black"}
                variant="text"
                placeholder=""
                onPointerEnter={() => {}}
                onPointerLeave={() => {}}
              >
                Login
              </Button>
            </Link>
        </div>
        <IconButton
          variant="text"
          color={isScrolling ? "black" : "black"}
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
          placeholder=""
          onPointerEnter={() => {}}
          onPointerLeave={() => {}}
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <div onPointerEnter={handlePointerEnter}>
            <ul className="flex flex-col gap-4 text-gray-900">
              {NAV_MENU.map(({ name, icon: Icon, href }) => (
                <NavItem key={name} href={href}>
                  <Icon className="h-5 w-5" />
                  {name}
                </NavItem>
              ))}
            </ul>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbarterms;