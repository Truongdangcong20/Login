const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: String,
    time: String,
    type: String,
    address: String
})

const Course = mongoose.model('courses', courseSchema);

exports.createCourse = async (name, time, type, address) => {
    const course = new Course({
        name: name,
        time: time,
        type: type,
        address: address
    })
    course.save((err, res) => {
        if (err) {
            throw new Error('Something wrong');
        }
        return res;
    });
}

exports.deleteCourseById = async (_id) => {
    await Course.deleteOne({
        _id : _id
    })
}

exports.deleteCourseByTime = async (time) => {
    await Course.deleteMany({
        time : time
    })
}
exports.deleteCourseByAddress = async (address) => {
    await Course.deleteMany({
        address : address
    })
}
exports.deleteCourseByName = async (name) => {
    await Course.deleteMany({
        name : name
    })
}
exports.deleteCourseByType = async (type) => {
    await Course.deleteMany({
        type : type
    })
}



exports.updateCourse = async (_id, name, time, type, address) => {
    await Course.updateMany({
        _id: _id
    }, {
        $set: {
            "name": name,
            "time": time,
            "type": type,
            "address": address
        }
    })
}

exports.showAllCourse = async () => {
    const result = await Course.find();
    return result;
}

exports.showCourseByName = async (name) => {
    const result = await Course.find({
        name : name
    });
    return result;
}
exports.showCourseByTime = async (time) => {
    const result = await Course.find({
        time : time
    });
    return result;
}
exports.showCourseByType = async (type) => {
    const result = await Course.find({
        type : type
    });
    return result;
}
exports.showCourseByAddress = async (address) => {
    const result = await Course.find({
        address: address
    });
    return result;
}
