-- CreateTable
CREATE TABLE `guest_drivers` (
    `driver_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phonenumber` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`driver_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guest_vehicles` (
    `vehicle_id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicle_number` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `vehicle_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`vehicle_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guest_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `college_id` INTEGER NOT NULL,
    `university_id` VARCHAR(191) NOT NULL,
    `campus_id` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guest_houses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `rooms` INTEGER NOT NULL,
    `available` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guestrequests` (
    `gRequestId` INTEGER NOT NULL AUTO_INCREMENT,
    `guest_name` VARCHAR(191) NOT NULL,
    `guest_email` VARCHAR(191) NOT NULL,
    `guest_mobile_number` VARCHAR(191) NOT NULL,
    `request_status` VARCHAR(191) NOT NULL,
    `vehicle_req` VARCHAR(191) NOT NULL,
    `room_req` VARCHAR(191) NOT NULL,
    `no_of_persons` INTEGER NOT NULL,
    `purpose_of_visit` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `guestrequests_user_id_idx`(`user_id`),
    PRIMARY KEY (`gRequestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicleallocation` (
    `vehicle_requestId` INTEGER NOT NULL AUTO_INCREMENT,
    `gRequestId` INTEGER NOT NULL,
    `guest_pickup_place` VARCHAR(191) NOT NULL,
    `guest_pickup_time` DATETIME(3) NOT NULL,
    `vehicle_start_time` DATETIME(3) NOT NULL,
    `vehicle_return_time` DATETIME(3) NOT NULL,
    `vehicle_id` INTEGER NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `vehicleallocation_gRequestId_key`(`gRequestId`),
    INDEX `vehicleallocation_vehicle_id_idx`(`vehicle_id`),
    INDEX `vehicleallocation_driver_id_idx`(`driver_id`),
    PRIMARY KEY (`vehicle_requestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roomallocation` (
    `room_reqId` INTEGER NOT NULL AUTO_INCREMENT,
    `gRequestId` INTEGER NOT NULL,
    `date_from` DATETIME(3) NOT NULL,
    `date_to` DATETIME(3) NOT NULL,
    `room_id` INTEGER NOT NULL,
    `house_id` INTEGER NOT NULL,

    UNIQUE INDEX `roomallocation_gRequestId_key`(`gRequestId`),
    INDEX `roomallocation_room_id_idx`(`room_id`),
    INDEX `roomallocation_house_id_idx`(`house_id`),
    PRIMARY KEY (`room_reqId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guest_rooms` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomNumber` INTEGER NOT NULL,
    `housed` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `vehicleRequestId` INTEGER NOT NULL,

    INDEX `guest_rooms_housed_idx`(`housed`),
    INDEX `guest_rooms_vehicleRequestId_idx`(`vehicleRequestId`),
    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
