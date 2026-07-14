# 🔧 Fix Applied: ESM Compatibility for Sanity Image URL Builder

## Issue

**Error**: `ReferenceError: require is not defined` on pages using image optimization
**Affected Pages**:

- `/parents`
- `/useful-links`
- `/bzhd`
- Other pages using `urlFor()` function

**Root Cause**: Using deprecated default export from `@sanity/image-url` package which internally relied on CommonJS `require()` statements, conflicting with Next.js ESM modules.

## Solution

Changed the import statement in [sanity/lib/image.js](sanity/lib/image.js) to use the named export instead of default export:

**Before** (deprecated):

```javascript
import createImageUrlBuilder from '@sanity/image-url'
```

**After** (fixed):

```javascript
import { createImageUrlBuilder } from '@sanity/image-url'
```

## Testing

✅ All pages tested and working without errors:

- [x] `/en/parents` - Loads successfully
- [x] `/uk/useful-links` - Loads successfully
- [x] `/en/bzhd` - Loads successfully with photo gallery
- [x] `/en/lego` - Loads successfully with photo gallery

## Build Status

```
✓ Build successful (15.4s)
✓ No deprecation warnings
✓ All routes recognized
✓ All pages render without errors
```

## Package Impact

- **Package**: `@sanity/image-url`
- **Change**: Using recommended named export instead of deprecated default export
- **Compatibility**: Improved ESM compatibility with Next.js Turbopack

## Files Changed

- `sanity/lib/image.js` (1 line changed)

## Related Deprecation Warning

While fixing the error, also resolved deprecation warning:

```
The default export of @sanity/image-url has been deprecated.
Use the named export `createImageUrlBuilder` instead.
```

This is now fixed and the warning will no longer appear in the build output.
