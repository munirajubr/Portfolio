import PropTypes from "prop-types";

const ButtonPrimary = ({
    href,
    target = '_self',
    label,
    icon,
    classes
}) => {
        if (href) {
            return (
                <a 
                href={href} 
                target={target}
                className={"btn btn-primary" + classes}
                >
                {label}

                {icon ?
                <span className="meterial-symnols-rounded" aria-hidden="true">
                {icon}
                </span>
                :undefined}
                </a>
            )
        } else {
            return (
                <button className={"btn btn-primary" + classes}>
                {label}

                {icon ?
                <span className="meterial-symnols-rounded" aria-hidden="true">
                {icon}
                </span>
                :undefined}
                </button>
            )
        }
}

ButtonPrimary.protoTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.string,
    classes: PropTypes.string
}

const ButtonOutline = ({
    href,
    target = '_self',
    label,
    icon,
    classes
}) => {
        if (href) {
            return (
                <a 
                href={href} 
                target={target}
                className={"btn btn-outline" + classes}
                >
                {label}

                {icon ?
                <span className="meterial-symnols-rounded" aria-hidden="true">
                {icon}
                </span>
                :undefined}
                </a>
            )
        } else {
            return (
                <button className={"btn btn-outline" + classes}>
                {label}

                {icon ?
                <span className="meterial-symnols-rounded" aria-hidden="true">
                {icon}
                </span>
                :undefined}
                </button>
            )
        }
}

ButtonOutline.protoTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.string,
    classes: PropTypes.string
}

export {
    ButtonPrimary,
    ButtonOutline
};