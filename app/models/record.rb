class Record

    attr_reader :id, :mood, :activity, :food, :activitywant, :foodwant, :grateful

    DB = PG.connect(host: 'localhost', port: 5432, dbname: 'mood_tracker_development')

    def initialize(opts)
        @id = opts["id"].to_i
        @mood = opts["mood"]
        @activity = opts["activity"]
        @food = opts["food"]
        @activitywant = opts["activitywant"]
        @foodwant = opts["foodwant"]
        @grateful = opts["grateful"]
    end

    def self.all
        results = DB.exec("SELECT * FROM records;")
        return results.map {|result| Record.new(result) }
    end

    def self.find(id)
        results = DB.exec("SELECT * FROM records WHERE id=#{id};")
        return Record.new(results.first)
    end

    def self.create(opts)
        results = DB.exec(
            <<-SQL
                INSERT INTO records (mood, activity, food, activitywant, foodwant, grateful)
                VALUES ( '#{opts["mood"]}',
                         '#{opts["activity"]}',
                         '#{opts["food"]}',
                         '#{opts["activitywant"]}',
                         '#{opts["foodwant"]}',
                         '#{opts["grateful"]}')
                RETURNING id, mood, activity, food, activitywant, foodwant, grateful;
                SQL
            )
            return Record.new(results.first)
    end

    def self.delete(id)
        results = DB.exec("DELETE FROM records WHERE id=#{id};")
        return { deleted: true }
    end

    def self.update(id, opts)
        results = DB.exec(
            <<-SQL
                UPDATE records
                SET
                 mood='#{opts["mood"]}',
                 activity='#{opts["activity"]}',
                 food='#{opts["food"]}',
                 activitywant='#{opts["activitywant"]}',
                 foodwant='#{opts["foodwant"]}',
                 grateful='#{opts["grateful"]}'
                WHERE id=#{id}
                RETURNING id, mood, activity, food, activitywant, foodwant, grateful;
            SQL
        )
        return Record.new(results.first)
    end

end
