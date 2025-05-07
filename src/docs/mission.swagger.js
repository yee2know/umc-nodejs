/**
 * @swagger
 * /missions:
 *   post:
 *     summary: 미션 추가 API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               store_id:
 *                 type: number
 *               d_day:
 *                 type: number
 *               goal_money:
 *                 type: number
 *               reward:
 *                 type: number
 *     responses:
 *       200:
 *         description: 미션 추가 성공 응답
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
 *                     store_id:
 *                       type: number
 *                     d_day:
 *                       type: number
 *                     goal_money:
 *                       type: number
 *                     reward:
 *                       type: number
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: 이미 미션을 추가한 상점일 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: S002
 *                     reason:
 *                       type: string
 *                       example: 미션 추가에 실패했습니다.
 *                     data:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         store_id:
 *                           type: number
 *                           example: 1
 *                         d_day:
 *                           type: number
 *                           example: 3
 *                         goal_money:
 *                           type: number
 *                           example: 100000
 *                         reward:
 *                           type: number
 *                           example: 10000
 */
/**
 * @swagger
 * /missions/challenge:
 *   post:
 *     summary: 미션 도전 API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               mission_id:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [PENDING]
 *     responses:
 *       200:
 *         description: 미션 도전 성공 응답
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
 *                     mission_id:
 *                       type: number
 *                     status:
 *                       type: string
 *                       enum: [PENDING, SUCCESS, FAIL]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: 미션 도전 실패 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: M001
 *                     reason:
 *                       type: string
 *                       example: 이미 도전/실패한 미션입니다.
 *                     data:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         user_id:
 *                           type: number
 *                           example: 1
 *                         mission_id:
 *                           type: number
 *                           example: 1
 *                         status:
 *                           type: string
 *                           enum: [PENDING, SUCCESS, FAIL]
 */
