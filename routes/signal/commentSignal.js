const express = require('express');
const router = express.Router();

router.put('/:idCom', function (req, res) {
    Comment.findById(req.params.idCom).then(
        comment => {
            if (!comment.reports.contains(req.user._id)){
                Comment.findByIdAndUpdate(comment._id, {$push :{reports: req.user._id}})
            }
        }
    )
});

module.exports = router;