var UNIT_TEST = {
    units : [],
    testcase : null,
    addCase : function(name, items) {
        for (var i in items) {
            var item = {
                name : name,
                item : i,
                run : items[i]
            }
            this.units.push(item);
        }
    },
    result : {
        caseresult : [],
        success : 0,
        error : 0
    },
    assert : function(a) {
        a ? (this.result.success++) : (this.result.error++);
        var item = {
            name : this.testcase.name,
            item : this.testcase.item,
            result : a
        }
        this.result.caseresult.push(item);
        var out = $("<div></div>");
        out.text("CASE " + item.name + "  " + item.item + "  " + (item.result ? "成功" : "失败"));
        $("body").append(out);
        this.trigger("_NEXTCASE", "");
    },
    assertRaises : function(a, b) {
        this.trigger("assertRaise", a, b);
    },
    assertTrue : function(a) {
        this.assert(a === true);
    },
    assertEqual : function(a, b) {
        this.assert(a === b);
    },
    _summary : function() {
        var out = $("<div></div>");
        out.text("CASE 成功 " + this.result.success);
        $("body").append(out);
        out = $("<div></div>");
        out.text("CASE 失败" + this.result.error);
        $("body").append(out);
    },
    start : function() {
        var self = this;
        this.on("_NEXTCASE", function() {
            if (self.units.length == 0) {
                self._summary();
                return;
            }
            self.testcase = self.units.shift();
            self.testcase.run();
        });
        this.trigger("_NEXTCASE", "");
    }
}

_.extend(UNIT_TEST, Backbone.Events);
UNIT_TEST.on("assertRaise", function(err, data) {
})
