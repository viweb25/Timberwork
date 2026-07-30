

type ServiceIconType = "building" | "house" | "interior" | "mep" | "wrench";

interface ServiceIconProps {
  icon: ServiceIconType;
  className?: string;
}

export function ServiceIcon({ icon, className = "w-8 h-8" }: ServiceIconProps) {
  switch (icon) {
    case "building":
      return (
         <img
      src="https://res.cloudinary.com/defqgygsf/image/upload/v1785319158/img21_t9jjeb.png"
      alt="House"
      className={className}
    />
      );
case "house":
  return (
    <img
      src="https://res.cloudinary.com/defqgygsf/image/upload/v1785317953/img32_nvjtmp.png"
      alt="House"
      className={className}
    />
  );
    case "interior":
      return (
          <img
      src="https://res.cloudinary.com/defqgygsf/image/upload/v1785318768/img34_mst5kl.png"
      alt="House"
      className={className}
    />
      );
    case "mep":
      return (
          <img
      src="https://res.cloudinary.com/defqgygsf/image/upload/v1785318842/img43_ubtfcz.png"
      alt="House"
      className={className}
    />
      );
    case "wrench":
      return (
         <img
      src="https://res.cloudinary.com/defqgygsf/image/upload/v1785319004/img45_mex1op.png"
      alt="House"
      className={className}
    />
      );
    default:
      return null;
  }
}
