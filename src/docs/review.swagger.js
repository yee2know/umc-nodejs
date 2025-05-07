/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: 리뷰 작성 API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               store_id:
 *                 type: number
 *               body:
 *                 type: string
 *               review_star:
 *                 type: number
 *     responses:
 *       200:
 *         description: 리뷰 작성 성공 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     user_id:
 *                       type: number
 *                     store_id:
 *                       type: number
 *                     body:
 *                       type: string
 *                     review_star:
 *                       type: number
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
