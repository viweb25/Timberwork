

type ServiceIconType = "building" | "house" | "interior" | "mep" | "wrench" | "ceiling";

interface ServiceIconProps {
  icon: ServiceIconType;
  className?: string;
}

export function ServiceIcon({ icon, className = "w-8 h-8" }: ServiceIconProps) {
  switch (icon) {
    case "building":
      return (
         <img
      src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785826104/2q73_zj8mxc.png"
      alt="House"
      className={className}
    />
      );
case "house":
  return (
    <img
      src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785826533/38e_oypupx.png"
      alt="House"
      className={className}
    />
  );
    case "interior":
      return (
          <img
      src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785826388/wgy_qvq916.png"
      alt="House"
      className={className}
    />
      );
    case "mep":
      return (
          <img
      src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785826413/237_f3nxm4.png"
      alt="House"
      className={className}
    />
      );
    case "ceiling":
      return (
        <img
          src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785826413/237_f3nxm4.png"
          alt="Ceiling"
          className={className}
        />
      );
    case "wrench":
      return (
         <img
      src="https://res.cloudinary.com/dhbdnffla/image/upload/v1785826803/2343_x1jjkf.png"
      alt="House"
      className={className}
    />
      );
    default:
      return null;
  }
}
