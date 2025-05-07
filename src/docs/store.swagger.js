/**
 * @swagger
 * /regions/{regionId}/stores:
 *   post:
 *     summary: 상점 추가 API
 *     parameters:
 *       - in: path
 *         name: regionId
 *         required: true
 *         schema:
 *           type: number
 *         description: 지역 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               storeTypeId:
 *                 type: number
 *               location:
 *                 type: string
 *               is_opened:
 *                 type: boolean
 *               star:
 *                 type: number
 *     responses:
 *       200:
 *         description: 상점 추가 성공 응답
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     store:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                         storeTypeId:
 *                           type: number
 *                         regionId:
 *                           type: number
 *                         name:
 *                           type: string
 *                         location:
 *                           type: string
 *                         is_opened:
 *                           type: boolean
 *                         star:
 *                           type: number
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *       500:
 *         description: 상점 이름 중복 오류
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
 *                       example: S001
 *                     reason:
 *                       type: string
 *                       example: 이미 존재하는 상점 이름입니다.
 *                     data:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: 스타벅스 홍대점
 *                         storeTypeId:
 *                           type: number
 *                           example: 1
 *                         location:
 *                           type: string
 *                           example: 서울시 마포구
 *                         is_opened:
 *                           type: boolean
 *                           example: true
 *                         star:
 *                           type: number
 *                           example: 4.5
 *                 success:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
/**
 * @swagger
 * /stores/{storeId}/reviews:
 *   get:
 *     summary: 상점 리뷰 목록 조회 API
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: number
 *         description: 상점 ID
 *     responses:
 *       200:
 *         description: 상점 리뷰 목록 조회 성공 응답
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
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           store:
 *                             type: object
 *                             properties:
 *                               id: { type: number }
 *                               name: { type: string }
 *                           user:
 *                             type: object
 *                             properties:
 *                               id: { type: number }
 *                               email: { type: string }
 *                               name: { type: string }
 *                           content:
 *                             type: string
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         cursor:
 *                           type: number
 *                           nullable: true
 */
/**
 * @swagger
 * /stores/{storeId}/missions:
 *   get:
 *     summary: 상점 미션 목록 조회 API
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: number
 *         description: 상점 ID
 *     responses:
 *       200:
 *         description: 상점 미션 목록 조회 성공 응답
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
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           storeId:
 *                             type: number
 *                           userId:
 *                             type: number
 *                           content:
 *                             type: string
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         cursor:
 *                           type: number
 *                           nullable: true
 */
