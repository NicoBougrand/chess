/**
 * The Enum Color.
 */
enum Color {
    WHITE, BLACK
}

class ColorUtil {

    public static toString(color: Color): string {
        const _color = Color[color];
        return _color.substring(0, 1).toUpperCase() + Color[color].substring(1).toLowerCase();
    }

    private constructor() {
        // NOTHING
    }
}

export { Color, ColorUtil, };
