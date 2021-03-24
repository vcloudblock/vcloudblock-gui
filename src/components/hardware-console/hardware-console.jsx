import React from 'react';
import {FormattedMessage, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollableFeed from 'react-scrollable-feed';
import iconv from 'iconv-lite';

import Box from '../box/box.jsx';
import MenuBarMenu from '../menu-bar/menu-bar-menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';
import styles from './hardware-console.css';
import cleanIcon from './clean.svg';
import settingIcon from './setting.svg';
import pauseIcon from './pause.svg';
import startIcon from './start.svg';

const toHexForm = buffer => Array.prototype.map.call(buffer, x => (`00${x.toString(16)}`).slice(-2)).join(' ');
const toStringGB2312 = buffer => iconv.decode(buffer, 'gb2312');
const toStringUTF8 = buffer => iconv.decode(buffer, 'utf-8');

const HardwareConsoleComponent = props => {
    const {
        baudrate,
        baudrateList,
        consoleArray,
        eol,
        eolList,
        intl,
        isAutoScroll,
        isHexForm,
        isPause,
        locale,
        onClickClean,
        onClickPause,
        onClickSerialportMenu,
        onClickHexForm,
        onClickAutoScroll,
        onClickSend,
        onInputChange,
        onRequestSerialportMenu,
        onSelectBaudrate,
        onSelectEol,
        serialportMenuOpen
    } = props;
    return (
        <Box className={styles.hardwareConsoleWrapper}>
            <Box className={styles.consoleArray}>
                <ScrollableFeed
                    forceScroll={isAutoScroll}
                >
                    <span>
                        {isHexForm ? toHexForm(consoleArray) :
                            locale === 'zh-cn' ? toStringGB2312(consoleArray) : toStringUTF8(consoleArray)
                        }
                    </span>
                </ScrollableFeed>
            </Box>
            <button
                className={classNames(styles.button, styles.pauseButton)}
                onClick={onClickPause}
            >
                <img
                    alt="Pause"
                    className={classNames(styles.pauseIcon)}
                    src={isPause ? startIcon : pauseIcon}
                />
            </button>
            <button
                className={classNames(styles.button, styles.cleanButton)}
                onClick={onClickClean}
            >
                <img
                    alt="Clean"
                    className={classNames(styles.cleanIcon)}
                    src={cleanIcon}
                />
            </button>
            <Box className={styles.consoleMenuWarpper}>
                <input
                    className={styles.consoleInput}
                    onChange={onInputChange}
                />
                <button
                    className={classNames(styles.button, styles.sendButton)}
                    onClick={onClickSend}
                >
                    <FormattedMessage
                        defaultMessage="Send"
                        description="Button in bottom to send data to serialport"
                        id="gui.hardwareConsole.send"
                    />
                </button>
                <button
                    className={classNames(styles.button, styles.settingButton)}
                >
                    <img
                        alt="Setting"
                        className={classNames(styles.settingIcon, {
                            [styles.active]: serialportMenuOpen
                        })}
                        src={settingIcon}
                        onMouseUp={onClickSerialportMenu}
                    />
                    <MenuBarMenu
                        className={classNames(styles.MenuBarMenu)}
                        menuClassName={styles.menu}
                        open={serialportMenuOpen}
                        place={'left'}
                        directiron={'up'}
                        onRequestClose={onRequestSerialportMenu}
                    >
                        <MenuSection >
                            <MenuItem
                                isRtl={props.isRtl}
                            >
                                <FormattedMessage
                                    defaultMessage="Buadrate"
                                    description="Serial buadrate."
                                    id="gui.hardwareConsole.buadrate"
                                />
                                <select
                                    onChange={onSelectBaudrate}
                                >
                                    {baudrateList.map(item => (
                                        <option
                                            key={item.key}
                                            selected={baudrate === item.key}
                                        >
                                            {item.value}
                                        </option>
                                    ))}
                                </select>
                            </MenuItem>
                            <MenuItem
                                isRtl={props.isRtl}
                            >
                                <FormattedMessage
                                    defaultMessage="End of line"
                                    description="End of line."
                                    id="gui.hardwareConsole.endOfLine"
                                />
                                <select
                                    onChange={onSelectEol}
                                >
                                    {eolList.map(item => (
                                        <option
                                            key={item.key}
                                            selected={eol === item.key}
                                        >
                                            {intl.formatMessage(item.value)}
                                        </option>
                                    ))}
                                </select>
                            </MenuItem>
                        </MenuSection>
                        <MenuSection >
                            <MenuItem
                                onClick={onClickHexForm}
                                isRtl={props.isRtl}
                            >
                                <FormattedMessage
                                    defaultMessage="Hex form"
                                    description="Display serial port data in hexadecimal."
                                    id="gui.hardwareConsole.hexform"
                                />
                                <input
                                    type="checkbox"
                                    name="hexform"
                                    checked={isHexForm}
                                />
                            </MenuItem>
                            <MenuItem
                                onClick={onClickAutoScroll}
                                isRtl={props.isRtl}
                                bottomLine
                            >
                                <FormattedMessage
                                    defaultMessage="Auto scroll"
                                    description="Auto scroll serialport console data."
                                    id="gui.hardwareConsole.autoScroll"
                                />
                                <input
                                    type="checkbox"
                                    name="autoScroll"
                                    checked={isAutoScroll}
                                />
                            </MenuItem>
                        </MenuSection>
                    </MenuBarMenu>
                </button>
            </Box>
        </Box>
    );
};

HardwareConsoleComponent.propTypes = {
    baudrate: PropTypes.string.isRequired,
    baudrateList: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })),
    consoleArray: PropTypes.instanceOf(Uint8Array),
    eol: PropTypes.string.isRequired,
    eolList: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.shape({
                defaultMessage: PropTypes.string.isRequired,
                description: PropTypes.string,
                id: PropTypes.string.isRequired
            })
        })),
    intl: intlShape,
    isRtl: PropTypes.bool,
    isHexForm: PropTypes.bool.isRequired,
    isPause: PropTypes.bool.isRequired,
    isAutoScroll: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    onClickClean: PropTypes.func.isRequired,
    onClickPause: PropTypes.func.isRequired,
    onClickAutoScroll: PropTypes.func.isRequired,
    onClickHexForm: PropTypes.func.isRequired,
    onClickSend: PropTypes.func.isRequired,
    onClickSerialportMenu: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onRequestSerialportMenu: PropTypes.func.isRequired,
    onSelectBaudrate: PropTypes.func.isRequired,
    onSelectEol: PropTypes.func.isRequired,
    serialportMenuOpen: PropTypes.bool.isRequired
};

export default HardwareConsoleComponent;
