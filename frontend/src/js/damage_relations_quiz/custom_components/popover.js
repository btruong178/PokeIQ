import { OverlayTrigger, Popover } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'
import { Button } from 'react-bootstrap';
import '../../../css/damage_relations_quiz/custom_components/popover.css'

export function HoverPopover({
    header,
    text,
    placement = 'bottom',
    className,
}) {
    const renderPopover = (props) => {
        return (
            <Popover id="hover-popover" {...props}>
                <Popover.Header className="hover-popover-header">{header}</Popover.Header>
                <Popover.Body className="hover-popover-text">{text}</Popover.Body>
            </Popover>
        )
    }

    return (
        <OverlayTrigger
            placement={placement}
            trigger={['hover', 'focus']}
            delay={{ show: 300, hide: 300 }}
            overlay={renderPopover}
            container={document.body}
        >
            <span className={className} style={{ cursor: 'pointer', display: 'inline-block' }}>
                <FaInfoCircle />
            </span>
        </OverlayTrigger>
    )
}

export function ClickPopover({
    text,
    button_text = 'Click me',
    placement = 'bottom',
    className,
}) {
    const renderPopover = (props) => {
        return (
            <Popover id="hover-popover" {...props}>
                <Popover.Header as="h3">Info</Popover.Header>
                <Popover.Body>
                    {text}
                </Popover.Body>
            </Popover>
        )
    }

    return (
        <OverlayTrigger
            placement={placement}
            trigger="click"
            overlay={renderPopover}
            container={document.body}
        >
            <span
                className={className}
                style={{ cursor: 'pointer', display: 'inline-block' }}
            >
                <Button>{button_text}</Button>
            </span>
        </OverlayTrigger>
    )
}