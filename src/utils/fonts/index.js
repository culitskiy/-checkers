import { css } from 'styled-components';

import SBSansDisplayLight from './SBSans/SBSansDisplay-Light.otf';
import SBSansDisplayRegular from './SBSans/SBSansDisplay-Regular.otf';
import SBSansDisplaySemiBold from './SBSans/SBSansDisplay-SemiBold.otf';

import SBSansTextRegular from './SBSans/SBSansText-Regular.otf';
import SBSansTextLight from './SBSans/SBSansText-Light.otf';

const FontWeight = {
    THIN: css`font-weight: 100`,
    LIGHT: css`font-weight: 300`,
    REGULAR: css`font-weight: 400`,
    MEDIUM: css`font-weight: 500`,
    SEMIBOLD: css`font-weight: 600`,
    BOLD: css`font-weight: 700`,
    BLACK: css`font-weight: 900`,
};

const Font = {
    SBSansDisplay: css`
        font-family: SB Sans Display, sans-serif;
    `,

    SBSansText: css`
        font-family: SB Sans Text, sans-serif;
    `,
};

const Fonts = css`
    @font-face {
        font-family: SB Sans Display;
        src: url('${SBSansDisplayRegular}') format('opentype');
    }

    @font-face {
        font-family: SB Sans Display;
        ${FontWeight.SEMIBOLD};
        src: url('${SBSansDisplaySemiBold}') format('opentype');
    }

    @font-face {
        font-family: SB Sans Display;
        ${FontWeight.LIGHT};
        src: url('${SBSansDisplayLight}') format('opentype');
    }

    @font-face {
        font-family: SB Sans Text;
        src: url('${SBSansTextRegular}') format('opentype');
    }

    @font-face {
        font-family: SB Sans Text;
        ${FontWeight.LIGHT};
        src: url('${SBSansTextLight}') format('opentype');
    }
`;

export default Fonts;
export { Font, FontWeight };
