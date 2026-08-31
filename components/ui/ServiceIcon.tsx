

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
          src="https://res.cloudinary.com/defqgygsf/image/upload/v1787982189/918_ss1zkk.png"
          alt="House"
          className={className}
        />
      );
    case "house":
      return (
        <img
          src="https://res.cloudinary.com/defqgygsf/image/upload/v1787982187/920_rjfjfu.png"
          alt="House"
          className={className}
        />
      );
    case "interior":
      return (
        <img
          src="https://res.cloudinary.com/defqgygsf/image/upload/v1787982185/938_c9f1ic.png"
          alt="House"
          className={className}
        />
      );
    case "mep":
      return (
        <img
          src="https://res.cloudinary.com/defqgygsf/image/upload/v1787982214/589_smtipf.png"
          alt="House"
          className={className}
        />
      );
    case "ceiling":
      return (
        <img
          src="https://res.cloudinary.com/defqgygsf/image/upload/v1787982214/589_smtipf.png"
          alt="Ceiling"
          className={className}
        />
      );
    case "wrench":
      return (
        <img
          src="https://res.cloudinary.com/defqgygsf/image/upload/v1787982201/46_lsluco.png"
          alt="House"
          className={className}
        />
      );
    default:
      return null;
  }
}
