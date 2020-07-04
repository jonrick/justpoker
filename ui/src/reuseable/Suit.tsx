import React from 'react';
import classnames from 'classnames';
import { Suit } from '../shared/models/game/cards';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Color from 'color';

const useLightenedStyles = makeStyles((theme: Theme) =>
    createStyles({
        [Suit.HEARTS]: {
            fill: Color(theme.custom.HEARTS).lighten(0.7).string(), // needs to be visible on dark
        },
        [Suit.SPADES]: {
            fill: Color(theme.custom.SPADES).lighten(1.3).string(), // needs to be visible on dark
        },
        [Suit.CLUBS]: {
            fill: Color(theme.custom.CLUBS).lighten(1.3).string(), // needs to be visible on dark
        },
        [Suit.DIAMONDS]: {
            fill: Color(theme.custom.DIAMONDS).lighten(0.7).string(), // needs to be visible on dark
        },
    }),
);

const useNormalStyles = makeStyles((theme: Theme) =>
    createStyles({
        whiteFill: { fill: 'white' },
        [Suit.HEARTS]: {
            fill: Color(theme.custom.HEARTS).string(),
        },
        [Suit.SPADES]: {
            fill: Color(theme.custom.SPADES).string(),
        },
        [Suit.CLUBS]: {
            fill: Color(theme.custom.CLUBS).string(),
        },
        [Suit.DIAMONDS]: {
            fill: Color(theme.custom.DIAMONDS).string(),
        },
    }),
);

function SuitIcon(props) {
    const lightenedStyles = useLightenedStyles();
    const normalStyles = useNormalStyles();
    const { suit, className, color, lightened } = props;

    function generateStringFromSuit(suit) {
        const classes = lightened ? lightenedStyles : normalStyles;
        switch (suit) {
            case Suit.HEARTS:
                return (
                    <Heart
                        className={classnames(className, { [classes[suit]]: color, [normalStyles.whiteFill]: !color })}
                    />
                );
            case Suit.SPADES:
                return (
                    <Spade
                        className={classnames(className, { [classes[suit]]: color, [normalStyles.whiteFill]: !color })}
                    />
                );
            case Suit.CLUBS:
                return (
                    <Club
                        className={classnames(className, { [classes[suit]]: color, [normalStyles.whiteFill]: !color })}
                    />
                );
            case Suit.DIAMONDS:
                return (
                    <Diamond
                        className={classnames(className, { [classes[suit]]: color, [normalStyles.whiteFill]: !color })}
                    />
                );
        }
        return null;
    }
    return generateStringFromSuit(suit);
}

export default SuitIcon;

function Club(props) {
    const { className } = props;

    return (
        <svg viewBox="0 0 167 175" className={className}>
            <g transform="translate(0,-877.36216)">
                <path d="m 33.57277,1031.6441 c 0.0435,-2.1326 2.41976,-3.3889 10.49989,-5.5512 12.14507,-3.2503 16.36065,-5.2676 21.9679,-10.5125 9.82494,-9.1901 15.25562,-21.22154 15.97824,-35.39913 0.36906,-7.24076 0.24246,-8.32449 -0.79266,-6.78544 -0.67753,1.00737 -2.97792,4.45418 -5.11199,7.65957 -7.97032,11.97146 -22.45213,19.5535 -35.36758,18.51676 -11.83058,-0.9496 -22.13911,-8.0757 -27.153181,-18.7705 C 11.408457,976.14131 9.9993832,974.1371 10,966.29829 c 5.75e-4,-7.29956 1.467962,-9.97978 3.127761,-13.57245 2.811689,-6.08595 9.305249,-12.90321 15.075899,-15.82742 4.21005,-2.1334 5.63196,-2.36479 12.00652,-1.95387 4.40788,0.28415 9.05935,1.27178 11.91429,2.52974 2.57586,1.13499 4.86604,1.88096 5.08928,1.65771 0.22325,-0.22324 -1.01801,-3.14232 -2.75836,-6.48683 -2.89215,-5.55798 -3.613547,-9.70494 -3.17439,-14.69794 0.715189,-8.13136 3.33033,-17.06576 9.26858,-22.66644 6.210544,-5.8575 13.15934,-8.70278 24.23193,-8.29118 10.30158,0.38295 16.28183,3.51796 21.8449,9.11271 5.44231,5.4733 8.15044,13.72926 8.79339,21.42097 0.42932,5.136 -0.30242,8.80285 -3.41548,15.07978 -1.87851,3.78769 -3.11542,6.88671 -2.74868,6.88671 0.36674,0 3.19626,-1.17617 6.28782,-2.61372 14.45758,-6.72263 31.03576,-0.21065 38.04272,14.94333 1.68146,3.63649 3.04501,6.21845 3.03882,14.4789 -0.007,8.74854 -1.3142,10.67446 -3.37074,14.84042 -6.50325,13.17365 -21.57941,20.77499 -35.34793,17.82215 -11.72207,-2.5139 -21.58027,-9.5882 -28.79683,-20.66458 -2.24081,-3.43932 -4.2733,-6.25331 -4.51666,-6.25331 -0.70681,0 0.71696,12.36855 2.17672,18.90959 2.84299,12.73914 11.304859,24.30404 22.0274,30.10484 4.10231,2.2193 12.45749,4.8896 21.58822,6.8996 1.4227,0.3132 2.73765,1.3922 3.02207,2.4798 0.49967,1.9108 0.12309,1.9254 -49.67283,1.9254 -27.59697,0 -50.16972,-0.3231 -50.16165,-0.7181 z" />
            </g>
        </svg>
    );
}

function Diamond(props) {
    const { className } = props;

    return (
        <svg viewBox="0 0 127 175" className={className}>
            <g transform="translate(0,-877.36216)">
                <path d="M 59.617823,1026.4045 C 54.076551,1017.027 35.802458,991.8393 22.320951,974.99722 15.544428,966.53149 10,959.28947 10,958.90385 c 0,-0.38562 2.498012,-3.68932 5.551138,-7.34155 14.779126,-17.67921 34.688967,-44.7342 42.813135,-58.17773 2.491067,-4.12211 4.836029,-7.13807 5.211026,-6.70213 0.374997,0.43594 3.911379,5.74741 7.858624,11.80326 8.617724,13.22128 27.37269,38.4164 38.049687,51.11535 l 7.73836,9.2038 -7.73836,9.2038 c -14.035208,16.69312 -34.03523,44.26125 -44.489713,61.32495 l -1.855601,3.0286 -3.520473,-5.9577 z" />{' '}
            </g>
        </svg>
    );
}

function Heart(props) {
    const { className } = props;

    return (
        <svg viewBox="0 0 148 175" className={className}>
            <g transform="translate(0,-877.36216)">
                <path d="M 72.527478,1027.3356 C 67.735381,1012.5493 60.313567,1000.5864 34.362543,965.81962 18.536177,944.6169 12.638368,934.36254 10.707991,924.69211 c -2.34401,-11.74257 1.196833,-22.934 9.664894,-30.54751 5.693913,-5.11932 11.608399,-7.31434 19.708529,-7.31434 13.35413,0 24.173768,7.64475 30.646178,21.65344 1.853077,4.01074 3.699135,6.9191 4.10235,6.46303 0.403216,-0.45608 1.467487,-2.76806 2.365047,-5.13774 3.890151,-10.27052 12.753803,-19.15322 21.999836,-22.0471 6.268975,-1.96211 17.496565,-0.79433 23.434335,2.43742 16.5279,8.9956 20.13184,28.66056 9.23263,50.37797 -4.28341,8.53497 -8.26314,14.35165 -21.47246,31.38367 -18.465777,23.80963 -29.595326,41.93515 -34.001621,55.37465 -0.906412,2.7646 -1.779228,5.0266 -1.939592,5.0266 -0.160363,0 -1.024651,-2.262 -1.920639,-5.0266 z" />{' '}
            </g>
        </svg>
    );
}

function Spade(props) {
    const { className } = props;

    return (
        <svg viewBox="0 0 134 175" className={className}>
            <g transform="translate(0,-877.36216)">
                <path d="m 20.939161,1030.506 c 0,-1.4924 0.891385,-1.9732 4.547872,-2.4529 13.962309,-1.8319 20.983871,-4.7632 28.32361,-11.8247 7.600374,-7.3121 11.615144,-17.14844 12.717104,-31.15721 0.67066,-8.52584 0.65566,-8.52708 -4.77102,-0.394 -6.513949,9.7625 -15.083549,14.55437 -25.977141,14.52567 -7.825511,-0.021 -12.08404,-1.6034 -17.514784,-6.50977 -5.772766,-5.2153 -8.202454,-11.0201 -8.26185,-19.73833 -0.0431,-6.32605 0.35571,-8.05605 3.20037,-13.88298 2.600554,-5.32691 5.163522,-8.47312 12.832039,-15.75215 28.960087,-27.48922 34.860356,-34.78388 39.048926,-48.27733 l 2.23182,-7.18977 2.49169,7.0593 c 4.37992,12.40885 7.87851,17.06082 28.32786,37.66667 22.347753,22.51878 25.281383,26.80517 25.990923,37.97596 0.23597,3.71499 -0.0613,8.56753 -0.66058,10.78343 -1.54857,5.7259 -6.41807,11.5784 -12.45597,14.9704 -4.30518,2.41847 -6.27328,2.92227 -11.489358,2.94097 -3.461855,0.012 -7.916125,-0.5383 -9.898375,-1.2238 -5.45239,-1.88547 -12.41928,-7.88957 -16.84472,-14.51667 l -3.96608,-5.93928 0,6.17938 c 0,7.5209 2.99724,19.73721 6.17137,25.15341 5.08366,8.6746 16.56424,15.8803 28.422093,17.8388 10.41665,1.7204 10.40653,1.7168 10.40653,3.7244 0,1.8645 -0.78717,1.8967 -46.436163,1.8967 -45.308668,0 -46.436166,-0.045 -46.436166,-1.8562 z" />{' '}
            </g>
        </svg>
    );
}
