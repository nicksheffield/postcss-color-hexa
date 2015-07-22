postcss-color-hexa
===================
A postcss plugin that enables the use of hexa() to combine hex codes and opacity into rgba()

---

Input
```css
body {
	background: hexa(#abc, 0.1);
}
```

Output
```css
body {
	background: rgba(170, 187, 204, 0.1);
}
```

## Usage

```javascript
postcss([require('postcss-color-hexa')]);
```