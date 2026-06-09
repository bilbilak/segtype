# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] — 2026-06-09

### Added

- Project documentation: brand guidelines, contributing guide, support guide
- GitHub Actions workflows for Pages deployment and automated releases
- Icon and visual branding assets

### Changed

- README overhauled with badges, shields, and full project description
- Demo page updated to import `.mjs` bundle

### Infrastructure

- Automated CI/CD pipeline for GitHub Pages publishing
- Automated release workflow for npm and GitHub Releases

## [1.0.0] — 2026-06-08

### Added

- Seven-segment display Web Component (`<x-seglyph>`)
- Segment modes: 7seg, 9seg, 14seg, 16seg
- Theme system with 9 built-in themes (Green, Amber, Blue, Red, Vapor, Light, Calculator, LCD, Backlit LCD)
- Custom color support (per-character on/off/bg)
- Glow effect with configurable blur radius
- Skew/shear transformation
- Character padding and fixed-length modes
- Segment-gap adjustment

### Infrastructure

- TypeScript source with full type declarations
- esbuild bundling for ESM, CJS, and IIFE (global) formats
- Playground at `site/index.html` with interactive reference diagram
- GPL-3.0-only license

[1.0.0]: https://github.com/bilbilak/segtype/releases/tag/v1.0.0
[1.1.0]: https://github.com/bilbilak/segtype/releases/tag/v1.1.0
