import { describe, it, expect } from 'vitest'
import { calcDiamondPoints, calcCircleRadius } from './geometry.js'

describe('geometry', () => {
  describe('calcDiamondPoints', () => {
    it('returns full rectangle diamond at scale 1', () => {
      const pts = calcDiamondPoints(0, 0, 100, 100, 1)
      expect(pts).toEqual([
        { x: 50, y: 0 },
        { x: 100, y: 50 },
        { x: 50, y: 100 },
        { x: 0, y: 50 }
      ])
    })

    it('returns centered half-size diamond at scale 0.5', () => {
      const pts = calcDiamondPoints(0, 0, 100, 100, 0.5)
      expect(pts).toEqual([
        { x: 50, y: 25 },
        { x: 75, y: 50 },
        { x: 50, y: 75 },
        { x: 25, y: 50 }
      ])
    })

    it('works with non-square rectangle', () => {
      const pts = calcDiamondPoints(10, 20, 200, 100, 1)
      expect(pts).toEqual([
        { x: 110, y: 20 },
        { x: 210, y: 70 },
        { x: 110, y: 120 },
        { x: 10, y: 70 }
      ])
    })

    it('returns single point (center) at scale 0', () => {
      const pts = calcDiamondPoints(0, 0, 100, 100, 0)
      expect(pts).toEqual([
        { x: 50, y: 50 },
        { x: 50, y: 50 },
        { x: 50, y: 50 },
        { x: 50, y: 50 }
      ])
    })
  })

  describe('calcCircleRadius', () => {
    it('returns half the smaller dimension at scale 1', () => {
      expect(calcCircleRadius(100, 100, 1)).toBe(50)
      expect(calcCircleRadius(100, 60, 1)).toBe(30)
      expect(calcCircleRadius(40, 100, 1)).toBe(20)
    })

    it('scales proportionally', () => {
      expect(calcCircleRadius(100, 100, 0.5)).toBe(25)
      expect(calcCircleRadius(100, 100, 0.25)).toBe(12.5)
    })

    it('returns 0 at scale 0', () => {
      expect(calcCircleRadius(100, 100, 0)).toBe(0)
    })
  })
})
